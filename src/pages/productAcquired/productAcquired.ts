import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import "rxjs/add/operator/map";

import {
  AlertController,
  ActionSheetController
} from 'ionic-angular';

// Providers
//import { Utils } from '../../providers/utils';


@Component({
  selector: 'page-productAcquired',
  templateUrl: 'productAcquired.html'
})
export class ProductAcquiredPage {


  products: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private af: AngularFire) {
    //this.products = af.database.list('/products');

    this.products = af.database.list('/products', {
      query: {
        orderByChild: 'acquired',
        equalTo: true
      }
        // Use the .map to convert and reverse the FirebaseList
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
      
      //this.products = this.products.slice().reverse();
      
    //this.utils.loading.dismiss()
    //.then(() => this.utils.loading.dismiss())
    //  .catch((error) => this.utils.showError(error));
    //this.utils.loading.dismiss();

  }

  // Show
  show(id, product) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você quer fazer?',
      buttons: this.getShowButtons(id, product)
    });
    actionSheet.present();
  }

  // Remove 
  remove(id: string) {
    this.products.remove(id);
  }

  /*Getters*/

  private getShowButtons(id, product) {
    var buttons = [
      {
        text: 'Deletar o Produto',
        role: 'destructive',
        handler: () => {
          this.remove(id);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    return buttons;
  }

}
