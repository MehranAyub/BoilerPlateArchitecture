import {
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FileUploader, FileUploaderOptions, FileItem } from "ng2-file-upload";
import { AppComponentBase } from "@shared/common/app-component-base";
import { ProfileServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppConsts } from "@shared/AppConsts";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { TokenService } from "abp-ng2-module/dist/src/auth/token.service";
import { IAjaxResponse } from "abp-ng2-module/src/abpHttpInterceptor";
import { PropertyDataService } from "../services/property-data.service";
@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    animations: [appModuleAnimation()],
})
export class FileUploadComponent
    extends AppComponentBase
    implements OnInit, OnChanges
{
    public uploader: FileUploader;
    private _uploaderOptions: FileUploaderOptions = {};
    public description: string;
    @Input() Id: string;
    @Input() isShowSaveBtn: boolean = false;

    constructor(
        injector: Injector,
        private _tokenService: TokenService,
        private propertyDataService: PropertyDataService
    ) {
        super(injector);
    }

    ngOnInit() { 
        this.initFileUploader();
        this.propertyDataService.uploader=this.uploader;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes["Id"]) {
            this.save();
        }
    }

    initFileUploader(): void {
        this.uploader = new FileUploader({
            url: AppConsts.remoteServiceBaseUrl + "/FileUpload/UploadFile",
        });
        this._uploaderOptions.autoUpload = false;
        this._uploaderOptions.authToken =
            "Bearer " + this._tokenService.getToken();
        this._uploaderOptions.removeAfterUpload = true;
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = true;
        };

        this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
            form.append("PropertyId", this.Id);
        };

        this.uploader.onSuccessItem = (item, response, status) => {
            const resp = <IAjaxResponse>JSON.parse(response);
            if (resp.success) {
                // this.message.success(this.l("FileSavedSuccessfully", response));
                this.propertyDataService.uploader=this.uploader;
                if (this.uploader.queue.length == 1) {
                    this.propertyDataService.refreshImagesGrid$.next(true);
                }
                this.propertyDataService.uploader=this.uploader;
            } else {
                this.message.error(resp.error.message);
            }
        };

        this.uploader.setOptions(this._uploaderOptions);
    }

    save(): void {
        if (this.uploader && !!this.Id) {
            this.uploader.uploadAll();
        }
        this.propertyDataService.uploader=this.uploader;
    }

    // fileChangeEvent(event: any): void {
    //     this.uploader.clearQueue();
    //     this.uploader.addToQueue([event.target.files[0]]);
    // }
}
