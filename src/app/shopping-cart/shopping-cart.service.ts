import { Item } from '../items/item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  shoppingCart: Item[] = [];
  total: number;
  cartItemNum: number;

  constructor(private http: HttpClient) { }

  public getShoppingCart() {
    let storage = this.getLocalStorage();

    if (storage == null) {
      this.fetchItems().subscribe((items) => {
        this.setToLocalStorage(items, this.total, this.cartItemNum)
        this.shoppingCart = items;
      });
    } else {
      this.shoppingCart = storage.cart;
    }
    return this.shoppingCart;
  }

  private fetchItems() {
    return this.http.get('https://angular-assigment-app.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            postsArray.push({ ...responseData[key] })
          }
          return postsArray;
        })
      )
  }

  private storeItems(shoppingCart: Item[]) {
    this.http.put('https://angular-assigment-app.firebaseio.com/posts.json',
      shoppingCart
    ).subscribe(responseData => {
      console.log('Post send successfully!');
    });
  }

  public saveItems(shoppingCart: Item[], total: number, qty: number) {
    debugger;
    this.setToLocalStorage(shoppingCart, total, qty);
    this.storeItems(shoppingCart);
  }

  public getTotal() {
    if (this.shoppingCart.length > 0) {
      let newShoppingCart = this.shoppingCart.map(this.calculateTotal);
      this.total = newShoppingCart.reduce((a, b) => {
        return a + b;
      });
      return this.total;
    }
    return this.total;
  }

  public getQty() {
    this.cartItemNum = 0;
    let reducer = (acc, item) => {
      return acc + item.qty;
    }

    this.cartItemNum = this.getShoppingCart().reduce(reducer, this.cartItemNum);
    return this.cartItemNum;
  }

  private setToLocalStorage(shoppingCart: Item[], total: number, qty: number) {
    let localStorageObject = {
      cart: shoppingCart,
      total: total,
      qty: qty
    }
    localStorage.setItem('localStorageObject', JSON.stringify(localStorageObject));
  }

  private getLocalStorage() {
    let storage = JSON.parse(localStorage.getItem("localStorageObject"));
    return storage;
  }

  public addItemToCart(item: Item, qtyNum: number) {
    let storage = this.getLocalStorage();
    let existingItem = this.shoppingCart.find(x => x.id == item.id);

    if (existingItem) {
      this.shoppingCart.forEach(function (item) {
        if (item.id == existingItem.id) item.qty += qtyNum;
      });
    } else {
      item.qty = qtyNum;
      if (!storage) {
        this.shoppingCart.push(item);
      }
      else {
        this.shoppingCart = storage.cart;
        this.shoppingCart.push(item);
      }
    }
    let newShoppingCart = this.shoppingCart.map(this.calculateTotal);
    this.total = newShoppingCart.reduce((a, b) => {
      return a + b;
    });


    this.setToLocalStorage(this.shoppingCart, this.total, this.getQty());
  }

  private calculateTotal(item: Item) {
    return item.qty * item.price
  }
}