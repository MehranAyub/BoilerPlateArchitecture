import {
    Component,
    Injector,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConsts } from "@shared/AppConsts";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/common/app-component-base";
import {
    EntityDtoOfInt64,
    UserListDto,
    UserServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { FileDownloadService } from "@shared/utils/file-download.service";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { Paginator } from "primeng/components/paginator/paginator";
import { Table } from "primeng/components/table/table";
import { HttpClient } from "@angular/common/http";
import { FileUpload } from "primeng/fileupload";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-referral-users",
    templateUrl: "./referral-users.component.html",
    styleUrls: ["./referral-users.component.less"],
})
export class ReferralUsersComponent extends AppComponentBase {
    @ViewChild("dataTable", { static: true }) dataTable: Table;
    @ViewChild("paginator", { static: true }) paginator: Paginator;
    @ViewChild("ExcelFileUpload", { static: true }) excelFileUpload: FileUpload;

    uploadUrl: string;

    //Filters
    advancedFiltersAreShown = false;
    filterText = "";
    selectedPermission = "";
    role = "";
    onlyLockedUsers = false;

    constructor(
        injector: Injector,
        private _userServiceProxy: UserServiceProxy,
        private _fileDownloadService: FileDownloadService,
        private _activatedRoute: ActivatedRoute,
        private _httpClient: HttpClient
    ) {
        super(injector);
        this.filterText =
            this._activatedRoute.snapshot.queryParams["filterText"] || "";
        this.uploadUrl =
            AppConsts.remoteServiceBaseUrl + "/Users/ImportFromExcel";
    }

    getUsers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._userServiceProxy
            .getReferralUsers(
                this.filterText,
                this.permission ? this.selectedPermission : undefined,
                this.role !== "" ? parseInt(this.role) : undefined,
                this.onlyLockedUsers,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(
                    this.paginator,
                    event
                ),
                this.primengTableHelper.getSkipCount(this.paginator, event)
            )
            .pipe(
                finalize(() => this.primengTableHelper.hideLoadingIndicator())
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    getRolesAsString(roles): string {
        let roleNames = "";

        for (let j = 0; j < roles.length; j++) {
            if (roleNames.length) {
                roleNames = roleNames + ", ";
            }

            roleNames = roleNames + roles[j].roleName;
        }

        return roleNames;
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }
}
