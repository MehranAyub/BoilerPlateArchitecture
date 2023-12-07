import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { FlipsComponent } from './entities/flips/flips.component';
import { ViewFlipModalComponent } from './entities/flips/view-flip-modal.component';
import { CreateOrEditFlipModalComponent } from './entities/flips/create-or-edit-flip-modal.component';

import { ImagesGridComponent } from './entities/propertyFileses/propertyFileses.component';
import { CreateOrEditPropertyFilesModalComponent } from './entities/propertyFileses/create-or-edit-propertyFiles-modal.component';

import { PropertiesComponent } from './entities/properties/properties.component';
import { ViewPropertyComponent } from './entities/properties/view-property.component';
import { CreateOrEditPropertyComponent } from './entities/properties/create-or-edit-property.component';

import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
// import { FileUploadModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'ng2-file-upload';
import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule, TabsModule, TooltipModule, BsDropdownModule, PopoverModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { from } from 'rxjs';;
import { FileUploadComponent } from './entities/file-upload/file-upload.component'
;
import { UploadPropertyComponent } from './entities/properties/upload-property.component';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
		InputMaskModule,		
        TableModule,
        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PopoverModule.forRoot(),
        FileUploadModule
    ],
    declarations: [
		FlipsComponent,
		ViewFlipModalComponent,		CreateOrEditFlipModalComponent,
		ImagesGridComponent,

		CreateOrEditPropertyFilesModalComponent,
		PropertiesComponent,

		ViewPropertyComponent,
		CreateOrEditPropertyComponent, 
        DashboardComponent,
        FileUploadComponent,
        UploadPropertyComponent
    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale }
        
    ]
})
export class MainModule { }
