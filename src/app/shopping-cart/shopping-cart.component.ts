import { Component, OnInit } from '@angular/core';
import { Item } from '../items/item.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Item[];
  total: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    let storage = this.shoppingCartService.getLocalStorage();
    storage ? this.shoppingCart = storage.cart : [];
    storage ? this.total = storage.total : 0;
  }
}
