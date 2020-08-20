import { Item } from '../items/item.model';

export class ShoppingCartService {
    shoppingCart: Item[] = [];

    getShoppingCart(){
        return this.shoppingCart.slice();
    }
}