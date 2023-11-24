import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PropertyFilesesServiceProxy, CreateOrEditPropertyFilesDto ,PropertyFilesPropertyLookupTableDto
					} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment'; 
                    

@Component({
    selector: 'createOrEditPropertyFilesModal',
    templateUrl: './create-or-edit-propertyFiles-modal.component.html'
})
export class CreateOrEditPropertyFilesModalComponent extends AppComponentBase implements OnInit{
   
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    selectedItem: PropertyFilesPropertyLookupTableDto;
                    properties: PropertyFilesPropertyLookupTableDto[];
                    filterText = '';

    propertyFiles: CreateOrEditPropertyFilesDto = new CreateOrEditPropertyFilesDto();

    propertyPropertySpecs = '';



    constructor(
        injector: Injector,
        private _propertyFilesesServiceProxy: PropertyFilesesServiceProxy
    ) {
        super(injector);
    }
    
    show(propertyFilesId?: number): void {
    

        if (!propertyFilesId) {
            this.propertyFiles = new CreateOrEditPropertyFilesDto();
            this.propertyFiles.id = propertyFilesId;
            this.propertyPropertySpecs = '';


            this.active = true;
            this.modal.show();
        } else {
            this._propertyFilesesServiceProxy.getPropertyFilesForEdit(propertyFilesId).subscribe(result => {
                this.propertyFiles = result.propertyFiles;

                this.propertyPropertySpecs = result.propertyPropertySpecs;


                this.active = true;
                this.modal.show();
            });
        }
        
        
    }

    save(): void {
            this.saving = true;
            
			
			
            this._propertyFilesesServiceProxy.createOrEdit(this.propertyFiles)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }



filterProperties(event: any) {
        this.filterText = event.query.toLowerCase();
        this.getProperties();
    }


    getProperties(){
this._propertyFilesesServiceProxy.getAllPropertyForLookupTable(
    this.filterText,
    undefined,
    undefined,
    10000
    ).subscribe((result) => {
        this.properties = result.items;
    });
    }












    close(): void {
        this.active = false;
        this.modal.hide();
    }
    
     ngOnInit(): void {
        
     }    
}
