import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public cartItemNum$: Observable<number> = this.shoppingCartService.qtyShoppingCart$
  isAuthenticated = false;
  constructor(private shoppingCartService: ShoppingCartService,
     private userService: UserService) { }

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
