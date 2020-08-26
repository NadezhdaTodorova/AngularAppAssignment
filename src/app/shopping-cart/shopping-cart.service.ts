import { Item } from '../items/item.model';

export class ShoppingCartService {
    shoppingCart: Item[] = [];
    total: number;
    cartItemNum: number;


    getShoppingCart(){
        let storage = this.getLocalStorage();
        return storage ? this.shoppingCart = storage.cart : this.shoppingCart.slice();
    }

    getTotal(){
        return this.total;
    }

    getQty(){
        this.cartItemNum = 0;
        let reducer = (acc, item) => {
            return acc + item.qty;
        }

        this.cartItemNum = this.getShoppingCart().reduce(reducer, this.cartItemNum);
        return this.cartItemNum;
    }

    setToLocalStorage(shoppingCart, total, qty){
        let localStorageObject = {
            cart: shoppingCart,
            total: total,
            qty: qty
        }
        localStorage.setItem('localStorageObject', JSON.stringify(localStorageObject));
    }

    getLocalStorage(){
        let storage = JSON.parse(localStorage.getItem("localStorageObject"));
        return storage;
    }

    pushItemToCart(item: Item, qtyNum: number){
      debugger;
        let storage = this.getLocalStorage();
        this.shoppingCart = storage ? storage.cart : [];
        let existingItem = this.shoppingCart.find(x => x.id == item.id);
    
        if(existingItem){
          this.shoppingCart.forEach(function (item){
             if(item.id == existingItem.id) item.qty += qtyNum;
            });
        }else{
          item.qty = qtyNum;
          if(!storage){
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
        
        this.setToLocalStorage(this.shoppingCart, this.total, this.getQty);
    }

    calculateTotal(item: Item) {
        return item.qty * item.price
      }
}