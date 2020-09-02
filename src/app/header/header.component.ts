import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { fromEvent, Subscription } from 'rxjs';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemNum = this.shoppingCartService.getQty();
  private userSub: Subscription;
  isAuthenticated = false;
  
  constructor(private shoppingCartService: ShoppingCartService, private userService: UserService) { }

  ngOnInit(): void {
    const qtyObservable = fromEvent<MouseEvent>(document, "click");
    qtyObservable.subscribe(click => this.cartItemNum = this.shoppingCartService.getQty());

    this.userSub = this.userService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
