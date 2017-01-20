import { Injectable } from '@angular/core';
/*import { Http } from '@angular/http';
import 'rxjs/add/operator/map';*/

import { AlertController, LoadingController } from 'ionic-angular';

/*
  Generated class for the Utils provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Utils {

    public loading;
    
    constructor(private alertCtrl: AlertController, public loadCtrl : LoadingController) {
        //console.log('Hello Utils Provider');
    }
    
     // Alert message
    public showMsg(title, msg){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Dismiss']
        });
      alert.present();
    }

    // Alert with error message
    public showError(msg){
        if(this.loading){
            this.loading.dismiss();            
        }
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    }
    
     public showLoading() {
        this.loading = this.loadCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present(this.loading);

        /*setTimeout(() => {
        this.loading.dismiss();
        }, 3000);*/
    }

}
