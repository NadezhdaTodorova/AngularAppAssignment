import { Component, OnInit } from '@angular/core';
import { ItemService } from './items/item.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { UserService } from './user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ItemService, ShoppingCartService]

})
export class AppComponent implements OnInit {
  title = 'shopping-site-assignment';
  constructor(private itemService: ItemService, private userService: UserService){}
  ngOnInit(): void {
    this.userService.autoLogin();
    this.itemService.fetchItems();
  }
}
