import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Sidebar } from '../pages/sidebar/sidebar';
import { ProductsPage } from '../pages/products/products';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
 
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
    Sidebar,
    ProductsPage
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
    Sidebar,
    ProductsPage
  ],
    providers: [AuthService]
  //providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
