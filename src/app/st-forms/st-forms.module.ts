import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { stPasswordValidator } from './st-form-control/st-password.validator';
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { NgbDatepickerModule, NgbButtonsModule, NgbTimepickerModule, NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ngx-ckeditor';

import { StFormControlTypeaheadComponent } from './st-form-control-typeahead/st-form-control-typeahead.component';
import { StFormControlComponent } from './st-form-control/st-form-control.component';
import { StFormComponent } from './st-form/st-form.component';
import { StFormActionComponent } from './st-form-action/st-form-action.component';
import { StPreventDefaultEventDirective } from './directives/st-prevent-default-event.directive';
import { StPaginationComponent } from './st-pagination/st-pagination.component';
import { StDataGridComponent } from './st-data-grid/st-data-grid.component';
import { StModalComponent } from './st-modal/st-modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { StM2mComponent } from './st-m2m/st-m2m.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StHttpInterceptor } from './st-http-interceptor';
import { StMessageService } from './st-message.service';
import { StGuardService } from './st-guard.service';
import { StFormControlDateTimeComponent } from './st-form-control-date-time/st-form-control-date-time.component';

import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { StFormControlImageUploadComponent } from './st-form-control-image-upload/st-form-control-image-upload.component';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StFormControlCkeditorComponent } from './st-form-control-ckeditor/st-form-control-ckeditor.component';
import { StFormControlBirthdayComponent } from './st-form-control-birthday/st-form-control-birthday.component';

import { StImagePathPipe } from './pipes/st-image-path.pipe';

// translation -- AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbButtonsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    TextMaskModule,
    DynamicFormsCoreModule,
    HttpClientModule,
    NgxPaginationModule,
    FileUploadModule,
    DlDateTimePickerDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule
  ],
  declarations: [
    StFormControlTypeaheadComponent,
    StFormControlComponent,
    StFormComponent,
    StFormActionComponent,
    StPreventDefaultEventDirective,
    StPaginationComponent,
    StDataGridComponent,
    StPaginationComponent,
    StModalComponent,
    StM2mComponent,
    StFormControlDateTimeComponent,
    StFormControlImageUploadComponent,
    StFormControlCkeditorComponent,
    StFormControlBirthdayComponent,
    StImagePathPipe
  ],
  exports: [
    StFormControlComponent,
    StFormComponent,
    StFormControlTypeaheadComponent,
    StFormActionComponent,
    StPreventDefaultEventDirective,
    StPaginationComponent,
    StModalComponent,
    StDataGridComponent,
    StM2mComponent,
    StImagePathPipe
  ],
  providers: [
    NgbActiveModal,
    StMessageService,
    StGuardService,
    { provide: NG_VALIDATORS, useValue: stPasswordValidator, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: StHttpInterceptor, multi: true }
   ]
})

export class StFormsModule { }