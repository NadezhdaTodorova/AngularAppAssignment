import { Item } from '../items/item.model';

export class ShoppingCartService {
    shoppingCart: Item[] = [
       /* new Item(0,'Esperanza eyeshadow pallete', '"Lorem ipsum pain sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor et dolore magna aliqua. Ut enim ad minim veniam, quer nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure pain in reprehenderit in volition velit esse cillum dolore eu fugiat nulla pariatur. Excepteur synt occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "', 
        26, 
        ['https://cdn.shopify.com/s/files/1/0008/4335/0079/products/image_e79e2bab-1ac0-433b-8726-3562691b6221_1024x1024.jpg?v=1570401919',
        'https://cdn.shopify.com/s/files/1/0008/4335/0079/products/Esperanzaedit_1024x1024.png?v=1592157946',
        'https://cdn.shopify.com/s/files/1/0008/4335/0079/products/BossyGirlEsperanza_01.jpgedited_1024x1024.jpg?v=1591546771',
        'https://cdn.shopify.com/s/files/1/0008/4335/0079/products/Esperanza_1024x1024.jpg?v=1590164817'],
        'eyeshadow'),
        new Item(1,'Autumn eyeshadow pallete', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit quaspernatur autodit sedia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui painrem ipsum quia pain sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et pain magnam aliquam quaerat min uiam voluptatem. , quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
         10, ['https://cdn.shopify.com/s/files/1/0008/4335/0079/products/Bossy_Girl_Cosmetics_Autumn_Palette_1024x1024.jpg?v=1570396892',
         'https://cdn.shopify.com/s/files/1/0008/4335/0079/files/A5CA4217-DD31-4CA0-BDB6-CE9AC99945F3_19253_600x600.jpg?v=1597785705',
        'https://cdn.shopify.com/s/files/1/0008/4335/0079/products/image_a9b8d94d-4e1b-4c4d-9b46-b1fea748d85d_1024x1024.jpg?v=1570392333',
        'https://cdn.shopify.com/s/files/1/0737/8455/products/35F_HERO_51d68aee-05c8-4bc3-968d-38a8835b15d6.jpg?v=1571265648'],
        'eyeshadow'), */
    ];

    getShoppingCart(){
        return this.shoppingCart.slice();
    }
}