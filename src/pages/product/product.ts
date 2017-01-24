import { Component } from '@angular/core';

import { 
  AlertController, 
  ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Providers
import {  Utils } from '../../providers/utils';

@Component({ 
    selector: 'page-product',
    templateUrl: 'product.html'
})
export class ProductPage {


    products: FirebaseListObservable < any > ;

    constructor( public alertCtrl: AlertController, private af: AngularFire, public actionSheetCtrl: ActionSheetController, public utils: Utils) {
        this.products = af.database.list('/products');
        //this.utils.loading.dismiss()
            //.then(() => this.utils.loading.dismiss())
          //  .catch((error) => this.utils.showError(error));
        
        //this.utils.loading.dismiss();
    }

    // Add products 
    add(){
      let prompt = this.alertCtrl.create({
        title: 'Nome do Produto',
        message: "Insira os dados do produto",
        inputs: [
          {
            name: 'name',
            placeholder: 'Nome',
              type:'text',
            checked : true
          },
          {
            name: 'quantity',
            placeholder: 'Quantidade',
            type:'number',
            checked : true
          }
        ],
        buttons: [
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
                    quantity: data.quantity

                  });
              } else {
                this.utils.showError('branco cara!');
              }              
            }
          }
        ]
      });
      prompt.present();
    }
    
    // Show
    show(id, product) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'O que você quer fazer?',
        buttons: [
          {
            text: 'Atualizar o Produto',
            handler: () => {
              this.update(id, product);
            }
          },{
            text: 'Deletar o Produto',
            role: 'destructive',
            handler: () => {
              this.remove(id);
            }
          },{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

    
    // Update
    update(id, product){
      let prompt = this.alertCtrl.create({
        title: 'Nome do produto',
        message: "Atualizando produto",
        inputs: [
           {
            name: 'name',
            placeholder: 'Nome',
            type:'text',
            value: product.name
          },
          {
            name: 'quantity',
            placeholder: 'Quantidade',
            type:'number',
            value: product.quantity
          }
        ],
        buttons: [
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
      });
      prompt.present();
    }
    
    
    // Remove 
    remove(id: string){
      this.products.remove(id);
    }
    
}