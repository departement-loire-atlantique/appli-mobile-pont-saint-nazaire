import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByProperty'
})
export class FilterByPropertyPipe implements PipeTransform {

  transform(arrayToFilter: [], prop: string, value: string): unknown {
    return arrayToFilter.filter(el => el[prop] === value);
  }

}
