import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullSubstitution'
})
export class NullSubstitutionPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(value === null || value) {
    return args.join(' ');
  } else {
    return value;
  }
  }

}
