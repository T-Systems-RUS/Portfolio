import {Pipe, PipeTransform} from '@angular/core';

/**
 * Converts baits to mb
 * @export
 * @class FileSizePipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'filesize'})
export class FileSizePipe implements PipeTransform {
  transform(size: number, extension: string = 'MB') {
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }
}
