import { Component, OnInit } from '@angular/core';
import { Item } from '../items/item.model';
import { ShoppingCartService } from './shopping-cart.service';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Item[];
  total: number;

  constructor(private shoppingCartService: ShoppingCartService, private postsService: PostsService) { }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.total = this.shoppingCartService.getTotal();
  }

  onCheckout(){
    this.postsService.postShoppingCart(this.shoppingCart);
  }   
}
