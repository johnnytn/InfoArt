import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { Storage } from '@ionic/storage';
// Providers
import { AuthService } from '../providers/auth-service';
import { Utils } from '../providers/utils';

import { MyApp } from './app.component';
// Pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ProductAcquiredPage } from '../pages/productAcquired/productAcquired';
import { ProviderPage } from '../pages/provider/provider';
import { SalePage } from '../pages/sale/sale';
import { RentPage } from '../pages/rent/rent';
 
// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDT2O1hbCgY5zrE-gy5ULxVkkvHpxuJC7M",
    authDomain: "infoart-b4861.firebaseapp.com",
    databaseURL: "https://infoart-b4861.firebaseio.com",
    storageBucket: "infoart-b4861.appspot.com",
    messagingSenderId: "275646495988"   
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProductPage,
    ProductAcquiredPage,
    ProviderPage,
    SalePage,
    RentPage
      
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProductPage,
    ProductAcquiredPage,
    ProviderPage,
    SalePage,
    RentPage
  ],
    providers: [AuthService, Utils, Storage]
  //providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
