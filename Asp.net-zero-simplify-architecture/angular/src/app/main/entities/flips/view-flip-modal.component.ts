import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetFlipForViewDto, FlipDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewFlipModal',
    templateUrl: './view-flip-modal.component.html'
})
export class ViewFlipModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetFlipForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetFlipForViewDto();
        this.item.flip = new FlipDto();
    }

    show(item: GetFlipForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
