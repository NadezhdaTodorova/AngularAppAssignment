import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(private shoppingcartService: ShoppingCartService) { }

  ngOnInit(): void { 
    this.shoppingcartService.fetchShoppingCart();
   }
}
