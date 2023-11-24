import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { PropertyFilesesServiceProxy, PropertyFilesDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditPropertyFilesModalComponent } from './create-or-edit-propertyFiles-modal.component';

import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector:'app-uploaded-files',
    templateUrl: './propertyFileses.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PropertyFilesesComponent extends AppComponentBase {
    
    
    @ViewChild('createOrEditPropertyFilesModal', { static: true }) createOrEditPropertyFilesModal: CreateOrEditPropertyFilesModalComponent;   
    
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() PropertyId: string;
    advancedFiltersAreShown = false;
    filterText = '';
        propertyPropertySpecsFilter = '';






    constructor(
        injector: Injector,
        private _propertyFilesesServiceProxy: PropertyFilesesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private sanitizer:DomSanitizer
    ) {
        super(injector);
    }

    getPropertyFileses(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._propertyFilesesServiceProxy.getAll(
            this.filterText,this.PropertyId,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
            result.items.forEach((x)=>{
                x.propertyFiles.imageBytes = 'data:image/png;base64,' + x.propertyFiles.imageBytes; 
            });
            console.log("items",result.items);
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createPropertyFiles(): void {
        this.createOrEditPropertyFilesModal.show();        
    }


    deletePropertyFiles(propertyFiles: PropertyFilesDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._propertyFilesesServiceProxy.delete(propertyFiles.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
    
    
     
    

    resetFilters(): void {
        this.filterText = '';
        		this.propertyPropertySpecsFilter = '';
					
        this.getPropertyFileses();
    }
}
