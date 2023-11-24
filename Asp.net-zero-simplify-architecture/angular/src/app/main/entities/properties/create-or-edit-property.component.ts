import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PropertiesServiceProxy, CreateOrEditPropertyDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {Observable} from "@node_modules/rxjs";






@Component({
    templateUrl: './create-or-edit-property.component.html',
    animations: [appModuleAnimation()]
})
export class CreateOrEditPropertyComponent extends AppComponentBase implements OnInit {
    active = false;
    saving = false;
    propertyId:string;
    isEditMode:boolean=false;
    property: CreateOrEditPropertyDto = new CreateOrEditPropertyDto();






    constructor(
        injector: Injector,
        private _activatedRoute: ActivatedRoute,        
        private _propertiesServiceProxy: PropertiesServiceProxy,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.show(this._activatedRoute.snapshot.queryParams['id']);
        
    }

    show(propertyId?: string): void {
        this.propertyId=propertyId;
        if (!propertyId) {
            this.property = new CreateOrEditPropertyDto();
            this.property.id = propertyId;
            this.isEditMode=false;

            this.active = true;
        } else {
            this._propertiesServiceProxy.getPropertyForEdit(propertyId).subscribe(result => {
                this.property = result.property;
                this.isEditMode=true;


                this.active = true;
            });
        }
        
         
    }
    
    save(): void {
        this.saving = true; 
        this._propertiesServiceProxy.createOrEdit(this.property)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(x => {
                this.propertyId=x;
                 this.saving = false;               
                 this.notify.info(this.l('SavedSuccessfully'));
                //  this.message.success("Property record saved successfully");
                 setTimeout(() => {
                 this._router.navigate( ['/app/main/entities/properties']);
                 }, 1500);
            })
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
