import { Component, OnInit } from '@angular/core';
import { Item } from '../items/item.model';
import { ShoppingCartService } from './shopping-cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Item[];
  total: number;
  qty: number;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.total = this.shoppingCartService.getTotal();
    this.qty = this.shoppingCartService.getQty();
  }

  onCheckout(){
    this.shoppingCartService.saveItems(this.shoppingCart, this.total, this.qty);
    this.router.navigate(['/checkout']);
  }   
}
