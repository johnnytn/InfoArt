import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ProductAcquiredPage } from '../pages/productAcquired/productAcquired';
import { ProviderPage } from '../pages/provider/provider';
import { SalePage } from '../pages/sale/sale';
import { RentPage } from '../pages/rent/rent';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = LoginPage;
  rootPage: any = LoginPage;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', icon: 'md-home', component: HomePage },
      { title: 'Produtos Vendidos', icon: 'md-bookmarks', component: SalePage },
      { title: 'Produtos para Comprar', icon: 'md-cart', component: ProductPage },
      { title: 'Produtos Comprados', icon: 'md-archive', component: ProductAcquiredPage },
      { title: 'Aluguéis', icon: 'md-briefcase', component: RentPage },
      { title: 'Fornecedores', icon: 'md-call', component: ProviderPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
        
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
