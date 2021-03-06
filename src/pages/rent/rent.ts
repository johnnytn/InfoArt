import { Component } from '@angular/core';

import {
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Providers
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html'
})
export class RentPage {

  rents: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, private af: AngularFire, public actionSheetCtrl: ActionSheetController, public utils: Utils) {
    this.rents = af.database.list('/rents', {
      query: {
        orderByChild: 'company'
      }
    });
  }

  // Add rents 
  add() {
    let prompt = this.alertCtrl.create({
      title: 'Aluguel realizado',
      message: "Insira os dados do aluguel",
      inputs: this.getAddInputs(),
      buttons: this.getAddButtons()
    });
    prompt.present();
  }


  // Show
  show(id, rent) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você quer fazer?',
      buttons: this.getShowButtons(id, rent)
    });
    actionSheet.present();
  }

  // Update
  update(id, rent) {
    let prompt = this.alertCtrl.create({
      title: 'Produto Vendido',
      message: "Atualizando venda",
      inputs: this.getUpdateInputs(rent),
      buttons: this.getUpdateButtons(id, rent)
    });
    prompt.present();
  }

  // Convert possible values to a single result
  private convertActiveValue(activeValue) {
    var active = activeValue.trim().toLowerCase();
    var valid = false;

    if (active == 'no' || active == 'não' || active == 'nao' || active == 'n') {
      active = 'Não';
      valid = true;
    } else if (active == 'yes' || active == 'sim' || active == 's') {
      active = 'Sim';
      valid = true;
    } else {
      valid = false;
    }
    var activeArray = [active, valid];
    return activeArray;
  }

  // Remove 
  private remove(id: string) {
    this.rents.remove(id);
  }

  /*Getters*/

  private getShowButtons(id, rent) {
    var buttons = [
      {
        text: 'Atualizar o Aluguel',
        handler: () => {
          this.update(id, rent);
        }
      }, {
        text: 'Deletar o Aluguel',
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
        name: 'company',
        placeholder: 'Empresa',
        type: 'text'
      },
      {
        name: 'cnpj',
        placeholder: 'CNPJ',
        type: 'text'
      },
      {
        name: 'price',
        placeholder: 'Valor',
        type: 'number'
      }, {
        name: 'active',
        placeholder: 'Ativo',
        type: 'text'
      }
    ]

    return inputs;
  }

  private getAddButtons() {
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

          /*if(data.active){
             var activeArray = this.convertActiveValue(data.active);
             data.active = activeArray[1]
         }
         
         // Verify if the fields are empty
         if (data.company && data.cnpj && data.price && data.active) {
         
             this.rents.update(id, {
                 company: data.company ? data.company : rent.company,
                 cnpj: data.cnpj ? data.cnpj : rent.cnpj,
                 price: data.price ? data.price : rent.price,
                 active : activeArray[0]
               });*/

          if (data.active) {
            var activeArray = this.convertActiveValue(data.active);
            data.active = activeArray[1]
          }

          // Verify if the fields are empty
          if (data.company && data.cnpj && data.price && data.active) {

            this.rents.push({
              company: data.company,
              cnpj: data.cnpj,
              price: data.price,
              active: activeArray[0]
            });
          } else {
            this.utils.showError('branco cara! Ou  Ativo está com dados inválidos');
          }

        }
      }
    ];
    return buttons;
  }

  private getUpdateInputs(rent) {
    let inputs = [
      {
        name: 'company',
        placeholder: 'Empresa',
        type: 'text',
        value: rent.company
      },
      {
        name: 'cnpj',
        placeholder: 'CNPJ',
        type: 'text',
        value: rent.cnpj
      },
      {
        name: 'price',
        placeholder: 'Preço',
        type: 'number',
        value: rent.price
      },
      {
        name: 'active',
        placeholder: 'Ativo',
        type: 'text',
        value: rent.active
      }
    ];
    return inputs;
  }

  private getUpdateButtons(id, rent) {
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

          if (data.active) {
            var activeArray = this.convertActiveValue(data.active);
            data.active = activeArray[1]
          }

          // Verify if the fields are empty
          if (data.company && data.cnpj && data.price && data.active) {

            this.rents.update(id, {
              company: data.company ? data.company : rent.company,
              cnpj: data.cnpj ? data.cnpj : rent.cnpj,
              price: data.price ? data.price : rent.price,
              active: activeArray[0]
            });
          } else {
            this.utils.showError('branco cara! Ou  Ativo está com dados inválidos');
          }
        }
      }
    ];

    return buttons;
  }


}



