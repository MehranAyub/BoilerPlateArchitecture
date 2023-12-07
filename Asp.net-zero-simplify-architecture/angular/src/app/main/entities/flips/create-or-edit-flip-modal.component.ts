import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { FlipsServiceProxy, CreateOrEditFlipDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditFlipModal',
    templateUrl: './create-or-edit-flip-modal.component.html'
})
export class CreateOrEditFlipModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    flip: CreateOrEditFlipDto = new CreateOrEditFlipDto();

            datePurchased: Date;


    constructor(
        injector: Injector,
        private _flipsServiceProxy: FlipsServiceProxy
    ) {
        super(injector);
    }

    show(flipId?: string): void {
this.datePurchased = null;

        if (!flipId) {
            this.flip = new CreateOrEditFlipDto();
            this.flip.id = flipId;
            this.flip.dateSold = moment().startOf('day');

            this.active = true;
            this.modal.show();
        } else {
            this._flipsServiceProxy.getFlipForEdit(flipId).subscribe(result => {
                this.flip = result.flip;

                if (this.flip.datePurchased) {
					this.datePurchased = this.flip.datePurchased.toDate();
                }

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
        if (this.datePurchased) {
            if (!this.flip.datePurchased) {
                this.flip.datePurchased = moment(this.datePurchased).startOf('day');
            }
            else {
                this.flip.datePurchased = moment(this.datePurchased);
            }
        }
        else {
            this.flip.datePurchased = null;
        }
            this._flipsServiceProxy.createOrEdit(this.flip)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
