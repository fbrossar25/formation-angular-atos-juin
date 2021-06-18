import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'app-page-add-orders',
  templateUrl: './page-add-orders.component.html',
  styleUrls: ['./page-add-orders.component.scss'],
})
export class PageAddOrdersComponent implements OnInit {
  public item = new Order();
  constructor() {}

  ngOnInit(): void {}
}
