import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { PropertiesServiceProxy, PropertyDto, PropertyStatusDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';


import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';


@Component({
    templateUrl: './properties.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PropertiesComponent extends AppComponentBase {
    
    
       
    
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    addressFilter = '';
    propertySpecsFilter = '';
    descriptionFilter = '';
    maxWholeSalePriceFilter : number;
		maxWholeSalePriceFilterEmpty : number;
		minWholeSalePriceFilter : number;
		minWholeSalePriceFilterEmpty : number;
    maxEstimatedARVFilter : number;
		maxEstimatedARVFilterEmpty : number;
		minEstimatedARVFilter : number;
		minEstimatedARVFilterEmpty : number;
    maxEstimatedRehabFilter : number;
		maxEstimatedRehabFilterEmpty : number;
		minEstimatedRehabFilter : number;
		minEstimatedRehabFilterEmpty : number;
    viewingDescriptionFilter = '';
    maxEMDRequirementFilter : number;
		maxEMDRequirementFilterEmpty : number;
		minEMDRequirementFilter : number;
		minEMDRequirementFilterEmpty : number;
    viewingContactFilter = '';
    offerContactFilter = '';
    IsFeatured:boolean=false;
    PropertyStatusFilter:PropertyStatusDto=PropertyStatusDto.IsForRent;
    PropertyStatus=PropertyStatusDto;





    constructor(
        injector: Injector,
        private _propertiesServiceProxy: PropertiesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
			private _router: Router
    ) {
        super(injector);
    }

    getProperties(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._propertiesServiceProxy.getAll(
            this.filterText,
            this.addressFilter,
            this.propertySpecsFilter,
            this.descriptionFilter,
            this.maxWholeSalePriceFilter == null ? this.maxWholeSalePriceFilterEmpty: this.maxWholeSalePriceFilter,
            this.minWholeSalePriceFilter == null ? this.minWholeSalePriceFilterEmpty: this.minWholeSalePriceFilter,
            this.maxEstimatedARVFilter == null ? this.maxEstimatedARVFilterEmpty: this.maxEstimatedARVFilter,
            this.minEstimatedARVFilter == null ? this.minEstimatedARVFilterEmpty: this.minEstimatedARVFilter,
            this.maxEstimatedRehabFilter == null ? this.maxEstimatedRehabFilterEmpty: this.maxEstimatedRehabFilter,
            this.minEstimatedRehabFilter == null ? this.minEstimatedRehabFilterEmpty: this.minEstimatedRehabFilter,
            this.viewingDescriptionFilter,
            this.maxEMDRequirementFilter == null ? this.maxEMDRequirementFilterEmpty: this.maxEMDRequirementFilter,
            this.minEMDRequirementFilter == null ? this.minEMDRequirementFilterEmpty: this.minEMDRequirementFilter,
            this.viewingContactFilter,
            this.offerContactFilter,this.PropertyStatusFilter,this.IsFeatured,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createProperty(): void {
        this._router.navigate(['/app/main/entities/properties/createOrEdit']);        
    }


    deleteProperty(property: PropertyDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._propertiesServiceProxy.delete(property.id)
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
            this.addressFilter = '';
    this.propertySpecsFilter = '';
    this.descriptionFilter = '';
    this.maxWholeSalePriceFilter = this.maxWholeSalePriceFilterEmpty;
		this.minWholeSalePriceFilter = this.maxWholeSalePriceFilterEmpty;
    this.maxEstimatedARVFilter = this.maxEstimatedARVFilterEmpty;
		this.minEstimatedARVFilter = this.maxEstimatedARVFilterEmpty;
    this.maxEstimatedRehabFilter = this.maxEstimatedRehabFilterEmpty;
		this.minEstimatedRehabFilter = this.maxEstimatedRehabFilterEmpty;
    this.viewingDescriptionFilter = '';
    this.maxEMDRequirementFilter = this.maxEMDRequirementFilterEmpty;
		this.minEMDRequirementFilter = this.maxEMDRequirementFilterEmpty;
    this.viewingContactFilter = '';
    this.offerContactFilter = '';
    this.IsFeatured=false;
    this.PropertyStatusFilter=PropertyStatusDto.IsForRent;

        this.getProperties();
    }
}
