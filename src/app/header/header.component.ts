import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemNum = this.shoppingCartService.getQty();
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    const qtyObservable = fromEvent<MouseEvent>(document, "click");
    qtyObservable.subscribe(click => this.cartItemNum = this.shoppingCartService.getQty());
  }
}
