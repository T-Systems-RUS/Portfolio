import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'dash'})
export class DashPipe implements PipeTransform {
  transform(value: string) {
    return value.replace(' ', '-');
  }
}
