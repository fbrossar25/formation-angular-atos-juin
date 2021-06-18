import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-add-orders',
  templateUrl: './page-add-orders.component.html',
  styleUrls: ['./page-add-orders.component.scss'],
})
export class PageAddOrdersComponent implements OnInit {
  public item = new Order();
  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {}

  public action(item: Order): void {
    this.ordersService.add(item).subscribe((res) => {
      this.router.navigate(['orders']);
    });
  }
}
