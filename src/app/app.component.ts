import { Component, OnInit } from '@angular/core';
import { ItemService } from './items/item.service'
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ItemService, ShoppingCartService]

})
export class AppComponent implements OnInit {
  title = 'shopping-site-assignment';

  constructor(){}
  
  ngOnInit(): void {
    
  }

}
