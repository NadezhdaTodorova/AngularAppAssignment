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
        let arr = this.getShoppingCart();
            arr.forEach((i) => {
            this.cartItemNum += i.qty;
        });
        return this.cartItemNum;
    }
}