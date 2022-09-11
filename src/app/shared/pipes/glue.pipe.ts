import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'glue'
})
export class GluePipe implements PipeTransform {

  transform(value: boolean): string {
    return (value)?'colle autorisé':'colle interdite';
  }

}
