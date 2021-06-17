import { Pipe, PipeTransform } from '@angular/core';
import { HasTotalI } from 'src/app/core/interfaces/has-total-i';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(val: HasTotalI, tva?: boolean): number {
    console.info('total() appelé');
    if (tva) {
      return val.totalTTC();
    }
    return val.totalHT();
  }
}
