import {
    Component,
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
import { EventEmitter } from "events";
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
    @Output() saved: EventEmitter = new EventEmitter();

    constructor(injector: Injector, private _tokenService: TokenService) {
        super(injector);
    }

    ngOnInit() {
        console.log(
            "AppConsts.remoteServiceBaseUrl",
            AppConsts.remoteServiceBaseUrl
        );
        this.initFileUploader();
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
            } else {
                this.message.error(resp.error.message);
            }
        };

        this.uploader.setOptions(this._uploaderOptions);
    }

    save(): void {
        if (this.uploader) {
            this.uploader.uploadAll();
        }
    }

    // fileChangeEvent(event: any): void {
    //     this.uploader.clearQueue();
    //     this.uploader.addToQueue([event.target.files[0]]);
    // }
}
