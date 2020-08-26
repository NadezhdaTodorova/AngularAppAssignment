import { Injectable } from '@angular/core';
import { Item } from '../app/items/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }

    postShoppingCart(shoppingCart: Item[]) {
        let postData = [];
        shoppingCart.forEach((item) => {
            postData.push({
                key: item.id,
                value: item.qty
            });
        });

        this.http.post('https://angular-assigment-app.firebaseio.com/posts.json',
            postData
        ).subscribe(responseData => {
            console.log('Post send successfully!');
        });
    }
}