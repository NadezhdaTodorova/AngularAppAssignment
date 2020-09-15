import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

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

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private shoppingCartService: ShoppingCartService) {}
    public ezpImages: string[] = this.itemService.ezpImages
    public autuImages: string[] = this.itemService.autuImages
    public goldBrushImages: string[] = this.itemService.goldBrushImages
    public carrBrushImages: string[] = this.itemService.carrBrushImages
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
         this.itemService.getItem(this.id)
          .subscribe(item => this.item = item);
        }
      );
  }
  onSelect(){
    this.shoppingCartService.addItemToCart(this.item, this.qtyNum);
    this.itemAdded = true; 
  }
  onQtySelected(event: Event){
    this.qtyNum = +(<HTMLInputElement>event.target).value;
  }
}