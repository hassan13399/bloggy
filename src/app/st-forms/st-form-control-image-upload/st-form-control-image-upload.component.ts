import { environment } from '../../../environments/environment';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploader, ParsedResponseHeaders, FileItem, FileLikeObject } from 'ng2-file-upload/ng2-file-upload';

const remoteURL = environment.remoteUrl;

@Component({
  selector: 'st-form-control-image-upload',
  templateUrl: './st-form-control-image-upload.component.html',
  styleUrls: ['./st-form-control-image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StFormControlImageUploadComponent,
      multi: true
    }
  ],
})
export class StFormControlImageUploadComponent implements ControlValueAccessor {

  file;
  onChange;

  @Input() model;
  // uploader: FileUploader = new FileUploader({
  //   url: remoteURL + '/upload',
  //   itemAlias: 'file',
  //   allowedMimeType: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/svg']
  // });

  constructor() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    // override the onCompleteItem property of the uploader
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   this.onChange(response);
    //   this.file = JSON.parse(response);
    //   this.file.path = remoteURL + this.file.path;
    //   // console.log('after file upload', this.file);
    // };

    // @TODO ajouter une erreur quand
    // this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
    //   // console.log('onWhenAddingFileFailed', item, filter, options);
    // };
  }

  writeValue(value) {
    if (value) {
      this.file = JSON.parse(value);
      this.file.path = remoteURL + this.file.path;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
  }

  // onFileSelected($event) {
  //   this.uploader.uploadAll();
  // }
}