import { Item } from '../items/item.model';

export class ShoppingCartService {
    shoppingCart: Item[] = [];
    total: number;
    cartItemNum: number;


    getShoppingCart(){
        return this.shoppingCart.slice();
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

    setToLocalStorage(){
        this.shoppingCart = this.getShoppingCart();
        this.total = this.getTotal();
        this.cartItemNum = this.getQty();

        let localStorageObject = {
            cart: this.shoppingCart,
            total: this.total,
            qty: this.cartItemNum
        }
        localStorage.setItem('localStorageObject', JSON.stringify(localStorageObject));
    }

    getLocalStorage(){
        let storage = JSON.parse(localStorage.getItem("localStorageObject"));
        return storage;
    }

    pushItemToCart(item: Item, qtyNum: number){
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
    
        let newShoppingCart = this.getShoppingCart().map(this.calculateTotal);
        this.total = newShoppingCart.reduce((a, b) => {
          return a + b;
        });
        
        this.setToLocalStorage();
    }

    calculateTotal(item: Item) {
        return item.qty * item.price
      }
}