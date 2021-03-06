import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemComponent } from './items/item-list/item/item.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemsComponent } from './items/items.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ItemService } from './items/item.service';
import { UserInterceptorService } from './user/user-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserRegisterComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ItemListComponent,
    ItemComponent,
    ItemDetailComponent,
    ItemsComponent,
    LoadingSpinnerComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [ShoppingCartService, ItemService, {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptorService,
    multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
