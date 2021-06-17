import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(val: number, coef: number, tva?: number): number {
    console.info('total() appelé');
    if (tva) {
      return val * coef * (1 + tva / 100);
    }
    return val * coef;
  }
}
