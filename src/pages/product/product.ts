import { Component } from '@angular/core';

import {
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Providers
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {


  products: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, private af: AngularFire, public actionSheetCtrl: ActionSheetController, public utils: Utils) {
    //this.products = af.database.list('/products');

    this.products = af.database.list('/products', {
      query: {
        orderByChild: 'acquired',
        equalTo: false
      }
    });

    //this.utils.loading.dismiss()
    //.then(() => this.utils.loading.dismiss())
    //  .catch((error) => this.utils.showError(error));

    //this.utils.loading.dismiss();
  }

  // Add products 
  add() {
    let prompt = this.alertCtrl.create({
      title: 'Nome do Produto',
      message: "Insira os dados do produto",
      inputs: this.getAddInputs(),
      buttons: this.getAddButtons()
    });
    prompt.present();
  }

  // Show
  show(id, product) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você quer fazer?',
      buttons: this.getShowButtons(id, product)
    });
    actionSheet.present();
  }

  // Update
  update(id, product) {
    let prompt = this.alertCtrl.create({
      title: 'Nome do produto',
      message: "Atualizando produto",
      inputs: this.getUpdateInputs(product),
      buttons: this.getUpdateButtons(id, product)
    });
    prompt.present();
  }

  // Acquired
  acquired(id, product) {
    let prompt = this.alertCtrl.create({
      title: 'Compra realizada?',
      message: "Compra realizada?",
      inputs: this.getAcquiredInputs(),
      buttons: this.getAcquiredButtons(id, product)
    });
    prompt.present();
  }

  // Remove 
  remove(id: string) {
    this.products.remove(id);
  }

    /*Getters*/
    
  private getShowButtons(id, product) {
    var buttons = [
      {
        text: 'Atualizar o Produto',
        handler: () => {
          this.update(id, product);
        }
      }, {
        text: 'Compra realizada?',
        handler: () => {
          this.acquired(id, product);
        }
      }, {
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

  private getAddInputs() {

    let inputs = [
      {
        name: 'name',
        placeholder: 'Nome',
        type: 'text',
        checked: true
      },
      {
        name: 'quantity',
        placeholder: 'Quantidade',
        type: 'number',
        checked: true
      }
    ]
    return inputs;
  }

  private getAddButtons() {
    var buttons = [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {

          if (data.name && data.quantity) {
            this.products.push({
              name: data.name,
              quantity: data.quantity,
              acquired: false
            });
          } else {
            this.utils.showError('branco cara!');
          }
        }
      }
    ]
    return buttons;
  }

  private getUpdateInputs(product) {

    let inputs = [
      {
        name: 'name',
        placeholder: 'Nome',
        type: 'text',
        value: product.name
      },
      {
        name: 'quantity',
        placeholder: 'Quantidade',
        type: 'number',
        value: product.quantity
      }
    ]
    return inputs;
  }

  private getUpdateButtons(id, product) {

    let buttons = [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          // Verify if the fields are empty
          if (data.name && data.quantity) {
            this.products.update(id, {
              name: data.name ? data.name : product.name,
              quantity: data.quantity ? data.quantity : product.quantity
            });
          } else {
            this.utils.showError('branco cara!');
          }
        }
      }
    ]
    return buttons;
  }

  private getAcquiredInputs() {

    let inputs = [
      {
        name: 'price',
        placeholder: 'Valor Total',
        type: 'number'
      }
    ]
    return inputs;
  }

  private getAcquiredButtons(id, product) {

    let buttons = [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          // Verify if the fields are empty
          if (data.price) {
            this.products.update(id, {
              price: data.price,
              acquired: true
            });
          } else {
            this.utils.showError('Valor Total da compra é necessário!');
          }
        }
      }
    ]
    return buttons;
  }

}
