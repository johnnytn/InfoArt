import { Component } from '@angular/core';

import {
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Providers
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-provider',
  templateUrl: 'provider.html'
})
export class ProviderPage {

  providers: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, private af: AngularFire, public actionSheetCtrl: ActionSheetController, public utils: Utils) {
    this.providers = af.database.list('/providers', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  // Add providers 
  add() {
    let prompt = this.alertCtrl.create({
      title: 'Nome do Fornecedor',
      message: "Insira os dados do fornecedor",
      inputs: this.getAddInputs(),
      buttons: this.getAddButtons()
    });
    prompt.present();
  }

  // Show
  show(id, provider) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você quer fazer?',
      buttons: this.getShowButtons(id, provider)
    });
    actionSheet.present();
  }

  // Update
  update(id, provider) {
    let prompt = this.alertCtrl.create({
      title: 'Nome do Fornecedor',
      message: "Atualizando Fornecedor",
      inputs: this.getUpdateInputs(id, provider),
      buttons: this.getUpdateButtons(id, provider)
    });
    prompt.present();
  }


  // Remove 
  remove(id: string) {
    this.providers.remove(id);
  }

  private getAddInputs() {
    let inputs = [
      {
        name: 'name',
        placeholder: 'Nome'
      },
      {
        name: 'email',
        placeholder: 'Email'
      },
      {
        name: 'phone',
        placeholder: 'Telefone'
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

          // Verify if the fields are empty
          if (data.name && (data.email || data.phone)) {
            this.providers.push({
              name: data.name,
              email: data.email,
              phone: data.phone
            });
          } else {
            this.utils.showError('branco cara!');
          }
        }
      }
    ]
    return buttons;
  }

  private getShowButtons(id, provider) {
    let buttons = [
      {
        text: 'Atualizar o Fornecedor',
        handler: () => {
          this.update(id, provider);
        }
      }, {
        text: 'Deletar o Fornecedor',
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

  private getUpdateInputs(id, provider) {
    let inputs = [
      {
        name: 'name',
        placeholder: 'Nome',
        value: provider.name
      },
      {
        name: 'email',
        placeholder: 'Email',
        value: provider.email
      },
      {
        name: 'phone',
        placeholder: 'Telefone',
        value: provider.phone
      }
    ]
    return inputs;
  }

  private getUpdateButtons(id, provider) {
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
          if (data.name && (data.email || data.phone)) {
            this.providers.update(id, {
              name: data.name ? data.name : provider.name,
              email: data.email,
              phone: data.phone
            });
          } else {
            this.utils.showError('branco cara!');
          }
        }
      }
    ]
    return buttons;
  }

}
