import { Component, OnInit } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemNum: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.cartItemNum = this.shoppingCartService.getShoppingCart().length;
  }
}
