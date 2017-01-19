import { Component } from '@angular/core';

import { 
  NavController, 
  AlertController, 
  ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({ 
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class ProductsPage {


    products: FirebaseListObservable < any > ;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    af: AngularFire, public actionSheetCtrl: ActionSheetController) {
        this.products = af.database.list('/products');
    }

    // Add products 
    add(){
      let prompt = this.alertCtrl.create({
        title: 'Nome do Produto',
        message: "Entre o nome do produto",
        inputs: [
          {
            name: 'name',
            placeholder: 'Nome'
          },
          {
            name: 'quantity',
            placeholder: 'Quantidade'
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
              this.products.push({
                name: data.name,
                quantity: data.quantity
                  
              });
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
            text: 'Deletar Produto',
            role: 'destructive',
            handler: () => {
              this.remove(id);
            }
          },{
            text: 'Atualizar Produto',
            handler: () => {
              this.update(id, product);
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
            placeholder: 'Nome'
          },
          {
            name: 'quantity',
            placeholder: 'Quantidade'
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
              this.products.update(id, {
                name: data.name ? data.name : product.name,
                quantity: data.quantity ? data.quantity : product.quantity
              });
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