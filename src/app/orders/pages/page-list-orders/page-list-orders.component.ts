import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit, OnDestroy {
  public states = Object.values(StateOrder);
  public myTitle = 'List Orders';
  private sub!: Subscription;
  public orders$!: Observable<Order[]>;
  public headers = [
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'State',
  ];
  constructor(private ordersService: OrdersService) {
    // copie par référence de l'observable
    // permet d'utiliser le pipe async dans le template HTML
    // qui gère lui-même les subscribe/unsubscribe automatiquement
    this.orders$ = this.ordersService.collection;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // change  state item
  public changeState(item: Order, event: any): void {
    const state = event.target.value;
    this.ordersService.changeState(item, state).subscribe((res: Order) => {
      // gerer les code erreur retournées par l'api
      Object.assign(item, res);
    });
  }
}
