import { StateOrder } from '../enums/state-order';
import { HasTotalI } from './has-total-i';

export interface OrderI extends HasTotalI {
  tjmHt: number;
  nbJours: number;
  tva: number;
  state: StateOrder;
  typePresta: string;
  client: string;
  comment: string;
  id: number;
}
