import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full'},
  { path: 'items', component: ItemsComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
