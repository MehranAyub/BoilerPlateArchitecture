﻿import {
    Component,
    ViewChild,
    Injector,
    Output,
    EventEmitter,
    OnInit,
    ElementRef,
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { finalize } from "rxjs/operators";
import {
    PropertiesServiceProxy,
    CreateOrEditPropertyDto,
    PropertyStatusDto,
    PropertyPropertyTypeLookupTableDto,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/common/app-component-base";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { Observable, Subscription, interval, timer } from "@node_modules/rxjs";
import { PropertyDataService } from "../services/property-data.service";

@Component({
    templateUrl: "./create-or-edit-property.component.html",
    animations: [appModuleAnimation()],
})
export class CreateOrEditPropertyComponent
    extends AppComponentBase
    implements OnInit
{
    active = false;
    saving = false;
    propertyId: string;
    isEditMode: boolean = false;
    property: CreateOrEditPropertyDto = new CreateOrEditPropertyDto();
    PropertyStatus = PropertyStatusDto;

    constructor(
        injector: Injector,
        private _activatedRoute: ActivatedRoute,
        private _propertiesServiceProxy: PropertiesServiceProxy,
        private _router: Router,
        private propertyDataService:PropertyDataService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.show(this._activatedRoute.snapshot.queryParams["id"]);
        this.getPropertyTypes();
    }

    show(propertyId?: string): void {
        this.propertyId = propertyId;
        if (!propertyId) {
            this.property = new CreateOrEditPropertyDto();
            this.property.id = propertyId;
            this.isEditMode = false;

            this.active = true;
        } else {
            this._propertiesServiceProxy
                .getPropertyForEdit(propertyId)
                .subscribe((result) => {
                    this.property = result.property;
                    this.isEditMode = true;

                    this.active = true;
                });
        }
    }

    save(): void {
        this.saving = true;
        this._propertiesServiceProxy
            .createOrEdit(this.property)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe((x) => {
                this.propertyId = x;
                this.saving = false;
                this.notify.info(this.l("SavedSuccessfully"));
                //  this.message.success("Property record saved successfully");
                // setTimeout(() => {
                //     this._router.navigate(["/app/main/entities/properties"]);
                // }, 1500);
 
                let timerSubscription:Subscription = interval(3000).subscribe((x) => {
                  if(this.propertyDataService.uploader.queue.length==0 || this.propertyDataService.uploader.queue.length==1){
                    timerSubscription.unsubscribe();
                    this._router.navigate(["/app/main/entities/properties"]);
                  }
                });
            });
    }
    propertyTypeLookupList: PropertyPropertyTypeLookupTableDto[] = [];
    getPropertyTypes(): void {
        this._propertiesServiceProxy
            .getAllPropertyTypeForTableDropdown()
            .subscribe((result) => {
                this.propertyTypeLookupList = result;
                this.property.propertyTypeId =
                    this.propertyTypeLookupList[0].id;
            });
    }
    // saveAndNew(): void {
    //     this.saving = true;

    //     this._propertiesServiceProxy.createOrEdit(this.property)
    //         .pipe(finalize(() => {
    //             this.saving = false;
    //         }))
    //         .subscribe(x => {
    //             this.propertyId=x;
    //             this.saving = false;
    //             this.notify.info(this.l('SavedSuccessfully'));
    //             this.property = new CreateOrEditPropertyDto();
    //         });
    // }
}
