import { Item } from '../items/item.model';

export class ShoppingCartService {
    shoppingCart: Item[] = [];
    total: number;

    getShoppingCart(){
        return this.shoppingCart.slice();
    }

    getTotal(){
        return this.total;
    }
}