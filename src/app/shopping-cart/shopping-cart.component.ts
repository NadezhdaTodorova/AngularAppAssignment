import { Component, OnInit } from '@angular/core';
import { Item } from '../items/item.model';
import { ShoppingCartService } from './shopping-cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$: Observable<Item[]> = this.shoppingCartService.shoppingCart$;
  public total$: Observable<number> = this.shoppingCartService.totalShoppingCart$;;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.total$.subscribe(x => 
      console.log(x));
  }

  onCheckout(){
    this.shoppingCartService.storeItems();
    this.router.navigate(['/checkout']);
  }   
}
