import { Item } from './item.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class ItemService {
    private readonly itemsSubj = new BehaviorSubject<Item[]>([]);
    public readonly items$: Observable<Item[]> = this.itemsSubj.asObservable();
    public ezpImages: string[] = [
      '../assets/pictures/ezperanzaEyeshadow/first.png',
      '../assets/pictures/ezperanzaEyeshadow/second.png',
      '../assets/pictures/ezperanzaEyeshadow/third.png',
      '../assets/pictures/ezperanzaEyeshadow/fourth.png'
    ]
    public autuImages: string [] = [
      '../assets/pictures/autumnEyeshadow/first.png',
      '../assets/pictures/autumnEyeshadow/second.png',
      '../assets/pictures/autumnEyeshadow/third.png',
      '../assets/pictures/autumnEyeshadow/fourth.png'
    ]
    public goldBrushImages: string[] = [
      '../assets/pictures/roseGoldBrush/first.png',
      '../assets/pictures/roseGoldBrush/second.png',
      '../assets/pictures/roseGoldBrush/third.png',
      '../assets/pictures/roseGoldBrush/fourth.png'
    ]
    public carrBrushImages: string[] = [
      '../assets/pictures/CaribbeanBrush/first.png',
      '../assets/pictures/CaribbeanBrush/second.png',
      '../assets/pictures/CaribbeanBrush/third.png',
      '../assets/pictures/CaribbeanBrush/fourth.png'
    ]
    
  constructor(private http: HttpClient) { }

   private get items(): Item[]{
      return this.itemsSubj.getValue();
    }

    getItem(id: number): Observable<Item> {
      return this.itemsSubj
        .pipe(
          map(items => items.find(item => item.id === id)),
        )
    }

    fetchItems() {
        this.http.get('https://angular-assigment-app.firebaseio.com/Items.json')
        .pipe(
          map(itemsResponse => {
            return Object.keys(itemsResponse).map(id => {
                const item = itemsResponse[id];
                return new Item(item.id, item.name, item.description, item.price, item.imagesPath, item.category);
            });
          })
        ).subscribe((items) =>{
          this.items = items;
        });
    }

   private set items(val: Item[]){
      this.itemsSubj.next(val);
    }

}