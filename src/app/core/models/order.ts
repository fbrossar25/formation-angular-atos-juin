import { StateOrder } from '../enums/state-order';
import { OrderI } from '../interfaces/order-i';

export class Order implements OrderI {
  tjmHt = 1200;
  nbJours = 1;
  tva = 20;
  state = StateOrder.OPTION;
  typePresta!: string;
  client!: string;
  comment!: string;
  id!: number;

  constructor(props?: Partial<Order>) {
    if (props) {
      Object.assign(this, props);
    }
  }
  public totalHT(): number {
    return this.tjmHt * this.nbJours;
  }
  public totalTTC(): number {
    return (this.tjmHt * this.nbJours * (100 + this.tva)) / 100;
  }
}
