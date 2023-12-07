import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FlipsServiceProxy, FlipDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditFlipModalComponent } from './create-or-edit-flip-modal.component';
import { ViewFlipModalComponent } from './view-flip-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './flips.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class FlipsComponent extends AppComponentBase {

    @ViewChild('createOrEditFlipModal') createOrEditFlipModal: CreateOrEditFlipModalComponent;
    @ViewChild('viewFlipModalComponent') viewFlipModal: ViewFlipModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    addressFilter = '';
    maxDatePurchasedFilter : moment.Moment;
		minDatePurchasedFilter : moment.Moment;
    maxPricePurchasedFilter : number;
		maxPricePurchasedFilterEmpty : number;
		minPricePurchasedFilter : number;
		minPricePurchasedFilterEmpty : number;
    maxAmountRehabFilter : number;
		maxAmountRehabFilterEmpty : number;
		minAmountRehabFilter : number;
		minAmountRehabFilterEmpty : number;
    maxDateSoldFilter : moment.Moment;
		minDateSoldFilter : moment.Moment;
    maxAmountSoldFilter : number;
		maxAmountSoldFilterEmpty : number;
		minAmountSoldFilter : number;
		minAmountSoldFilterEmpty : number;




    constructor(
        injector: Injector,
        private _flipsServiceProxy: FlipsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getFlips(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._flipsServiceProxy.getAll(
            this.filterText,
            this.addressFilter,
            this.maxDatePurchasedFilter,
            this.minDatePurchasedFilter,
            this.maxPricePurchasedFilter == null ? this.maxPricePurchasedFilterEmpty: this.maxPricePurchasedFilter,
            this.minPricePurchasedFilter == null ? this.minPricePurchasedFilterEmpty: this.minPricePurchasedFilter,
            this.maxAmountRehabFilter == null ? this.maxAmountRehabFilterEmpty: this.maxAmountRehabFilter,
            this.minAmountRehabFilter == null ? this.minAmountRehabFilterEmpty: this.minAmountRehabFilter,
            this.maxDateSoldFilter,
            this.minDateSoldFilter,
            this.maxAmountSoldFilter == null ? this.maxAmountSoldFilterEmpty: this.maxAmountSoldFilter,
            this.minAmountSoldFilter == null ? this.minAmountSoldFilterEmpty: this.minAmountSoldFilter,
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

    createFlip(): void {
        this.createOrEditFlipModal.show();
    }

    deleteFlip(flip: FlipDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._flipsServiceProxy.delete(flip.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
