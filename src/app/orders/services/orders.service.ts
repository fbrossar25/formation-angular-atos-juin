import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  //private collection
  private collection$!: Observable<Order[]>;
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    console.info('service orders instancié');
    this.collection = this.http.get<Order[]>(`${this.urlApi}/orders`);
  }

  public get collection(): Observable<Order[]> {
    return this.collection$;
  }

  public set collection(col: Observable<Order[]>) {
    this.collection$ = col;
  }

  //set collection

  //update iem in collection

  //add item in collection

  //delete item in collection

  //get item by id in collection
}
