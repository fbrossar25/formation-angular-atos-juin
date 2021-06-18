import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  //private collection
  private collection$ = new BehaviorSubject<Order[]>([]);
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    this.refreshCollection();
  }

  public refreshCollection(): void {
    this.http
      .get<Order[]>(`${this.urlApi}/orders`)
      .pipe(
        map((tab) => {
          // on convertis cahque tableau retourné par cette observable à chaque appel de next()
          return tab.map((obj) => new Order(obj)); // ici on convertis chaque object de ce tableau en Order
        })
      )
      .subscribe((res) => {
        this.collection$.next(res);
      });
  }

  public get collection(): BehaviorSubject<Order[]> {
    return this.collection$;
  }

  // change  state item
  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = new Order({ ...item });
    obj.state = state;
    return this.update(obj);
  }

  // update item in collection
  public update(item: Order): Observable<Order> {
    return this.http
      .put<Order>(`${this.urlApi}/orders/${item.id}`, item)
      .pipe(tap(() => this.refreshCollection()));
  }

  public add(item: Order): Observable<Order> {
    return this.http
      .post<Order>(`${this.urlApi}/orders`, item)
      .pipe(tap(() => this.refreshCollection()));
  }

  public getItemById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.urlApi}/orders/${id}`);
  }

  // delete item in collection
  public delete(item: Order): Observable<any> {
    return this.http
      .delete<any>(`${this.urlApi}/orders/${item.id}`)
      .pipe(tap(() => this.refreshCollection()));
  }

  //update iem in collection

  //add item in collection

  //delete item in collection

  //get item by id in collection
}
