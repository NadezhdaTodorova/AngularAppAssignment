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
    this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    this.total = JSON.parse(localStorage.getItem("total"));
  }

}
