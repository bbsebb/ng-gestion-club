import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';

const NAME: string[] = [
  'cercle',
  'club',
  'sportif',
  'sportive',
  'association',
  'olympique',
  'hanball',
  'entente',
  'ent.',
  'hb',
  'avenir',
  'centre',
  'alsace'
];

@Pipe({
  name: 'clubName',
})
export class ClubNamePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((word) => {
        if (NAME.includes(word.toLowerCase())) {
          return '';
        } else {
          return word;
        }
      })
      .join(' ');
  }
}
