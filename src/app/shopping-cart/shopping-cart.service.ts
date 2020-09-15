import { Item } from '../items/item.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private readonly shoppingCartSubj = new BehaviorSubject<Item[]>([]);
  public readonly shoppingCart$: Observable<Item[]> = this.shoppingCartSubj.asObservable();

  public readonly totalShoppingCart$ = this.shoppingCart$.pipe(
    map((items) => {
      if (items.length > 0) {
        return items.map(item => item.qty * item.price)
          .reduce((a, b) => {
            return a + b;
          });
      }
    }
  ));

  public readonly qtyShoppingCart$ = this.shoppingCart$.pipe(
    map(items => {
      let qty = 0;
       items.map((item) => {
         return qty = qty + item.qty;
      })
      return qty;
    }
  ))

  constructor(private http: HttpClient, private userService: UserService) { }
  
  
  fetchShoppingCart() {
      return this.http.get('https://angular-assigment-app.firebaseio.com/shoppingCart.json',)
    .pipe(
      map(itemsResponse => {
        return Object.keys(itemsResponse).map(id => {
            const item = itemsResponse[id];
            return new Item(item.id, item.name, item.description, item.price, item.imagesPath, item.category, item.qty);
        });
      })
    ).subscribe((items) =>{
      if(items){
        this.shoppingCartSubj.next(items);
      }
    });
}
  
   storeItems() {
    let shoppingCart: Item[];
    this.shoppingCartSubj.subscribe(
      items => shoppingCart = items
    )
    this.http.put<Item []>('https://angular-assigment-app.firebaseio.com/shoppingCart.json',
      shoppingCart
    ).subscribe();
  }

   addItemToCart(newItem: Item, qtyNum: number) {
    let  items = this.shoppingCartSubj.value;
    let existingItem = items.find(item => item.id == newItem.id);

        if (existingItem) {
          items.map((item) => {
            if(item.id == newItem.id){
              item.qty += qtyNum;
            }
          })
          this.shoppingCartSubj.next(items);
        } else {
          newItem.qty = qtyNum;
          this.shoppingCartSubj.next([...this.shoppingCartSubj.value, newItem]);
        }
  }
}


      