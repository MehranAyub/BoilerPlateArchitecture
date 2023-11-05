import {AppConsts} from "@shared/AppConsts";
import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PropertiesServiceProxy, GetPropertyForViewDto, PropertyDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './view-property.component.html',
    animations: [appModuleAnimation()]
})
export class ViewPropertyComponent extends AppComponentBase implements OnInit {

    active = false;
    saving = false;

    item: GetPropertyForViewDto;


    constructor(
        injector: Injector,
        private _activatedRoute: ActivatedRoute,
         private _propertiesServiceProxy: PropertiesServiceProxy
    ) {
        super(injector);
        this.item = new GetPropertyForViewDto();
        this.item.property = new PropertyDto();        
    }

    ngOnInit(): void {
        this.show(this._activatedRoute.snapshot.queryParams['id']);
    }

    show(propertyId: string): void {
      this._propertiesServiceProxy.getPropertyForView(propertyId).subscribe(result => {      
                 this.item = result;
                this.active = true;
            });       
    }
    
    
}
