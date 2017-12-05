import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facturesFilter'
})
export class FacturesFilterPipe implements PipeTransform {

  transform(value: any, filterValue: any, propName: string): any {
    if(value.length === 0) return value;
    if(!filterValue) return value;

    return value.filter(item => item[propName] == filterValue);
  }

}
