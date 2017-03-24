import { Component } from '@angular/core';

import {
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Providers
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html'
})
export class SalePage {

  sales: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, private af: AngularFire, public actionSheetCtrl: ActionSheetController, public utils: Utils) {
    this.sales = af.database.list('/sales');
  }

  // Add sales 
  add() {
    let prompt = this.alertCtrl.create({
      title: 'Produto Vendido',
      message: "Insira os dados do produto",
      inputs: this.getAddInputs(),
      buttons: this.getAddButtons()
    });
    prompt.present();
  }

  // Show
  show(id, sale) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você quer fazer?',
      buttons: this.getShowButtons(id, sale)
    });
    actionSheet.present();
  }

  // Update
  update(id, sale) {
    let prompt = this.alertCtrl.create({
      title: 'Produto Vendido',
      message: "Atualizando venda",
      inputs: this.getUpdateInputs(id, sale),
      buttons: this.getUpdateButtons(id, sale)
    });
    prompt.present();
  }

  // Remove 
  remove(id: string) {
    this.sales.remove(id);
  }

  private getAddInputs() {

    var fields =
      [{
        name: 'name',
        placeholder: 'Nome',
        type: 'text'
      },
      {
        name: 'quantity',
        placeholder: 'Quantidade',
        type: 'number'
      },
      {
        name: 'price',
        placeholder: 'Preço',
        type: 'number'
      },
      {
        name: 'paymentMethod',
        placeholder: 'Forma de Pagamento',
        type: 'text'
      }]
    return fields;
  }

  private getAddButtons() {

    let buttons =
      [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {

          // Verify if the fields are empty
          if (data.name && data.quantity && data.price) {

            var total = data.quantity * data.price;

            this.sales.push({
              name: data.name,
              quantity: data.quantity,
              price: data.price,
              total: total,
              paymentMethod: data.paymentMethod
            });
          } else {
            this.utils.showError('branco cara!');
          }

        }
      }]
    return buttons;
  }

  private getShowButtons(id, sale) {
    var buttons =
      [{
        text: 'Atualizar Venda',
        handler: () => {
          this.update(id, sale);
        }
      }, {
        text: 'Deletar Venda',
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

  private getUpdateInputs(id, sale) {
    console.log('here');

    var inputs = [{
      name: 'name',
      placeholder: 'Nome',
      type: 'text',
      value: sale.name
    },
    {
      name: 'quantity',
      placeholder: 'Quantidade',
      type: 'number',
      value: sale.quantity
    },
    {
      name: 'price',
      placeholder: 'Preço',
      type: 'number',
      value: sale.price
    },
    {
      name: 'paymentMethod',
      placeholder: 'Forma de Pagamento',
      type: 'text',
        value: sale.paymentMethod
    }
    ];

    return inputs;
  }

  private getUpdateButtons(id, sale) {
    var buttons =
      [
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
            if (data.name && data.quantity && data.price) {

              var total = data.quantity * data.price;

              this.sales.update(id, {
                name: data.name ? data.name : sale.name,
                quantity: data.quantity ? data.quantity : sale.quantity,
                price: data.price ? data.price : sale.price,
                total: total,
                paymentMethod: data.paymentMethod
              });
            } else {
              this.utils.showError('branco cara!');
            }
          }
        }
      ];

    return buttons;
  }
}

