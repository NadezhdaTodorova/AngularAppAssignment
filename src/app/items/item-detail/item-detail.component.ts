import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';
import { ItemsComponent } from '../items.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
   item: Item;
   id: number;
   itemAdded = false;
   qtyNum: number;
   items: Item[];

  constructor(private route: ActivatedRoute, private itemService: ItemService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.item = this.itemService.getItem(this.id);
        }
      );

  }

  onSelect(){
    this.items = this.shoppingCartService.getShoppingCart();
    let existingItem = this.items.find(x => x.id == this.item.id);
    let quantity = this.qtyNum;

    if(existingItem){
      this.items.forEach(function (item){
         if(item.id == existingItem.id) item.qty += quantity;
        });
    }else{
      this.item.qty = quantity;
      this.shoppingCartService.shoppingCart.push(this.item);
    }
    this.itemAdded = true; 
  }

  onQtySelected(event: Event){
    this.qtyNum = +(<HTMLInputElement>event.target).value;
  }
}
