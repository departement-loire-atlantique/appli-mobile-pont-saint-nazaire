import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByProperty'
})
export class FilterByPropertyPipe implements PipeTransform {

  transform(arrayToFilter: any[], prop: string, value: string): any[] {
    return (arrayToFilter || []).filter(el => el[prop] === value);
  }

}
