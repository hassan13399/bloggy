import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

/*
 * return imagePath from json
*/
@Pipe({name: 'stImagePath'})
export class StImagePathPipe implements PipeTransform {
  transform(value: string, args: string[]): string {

    if (value) {
      const URL = environment.remoteUrl;
      const image = JSON.parse(value);

      return URL + image.path;
    } else {

      return '';
    }
  }
}