import { Component } from '@angular/core';
import { NavController, 
        MenuController, 
        AlertController, LoadingController } from 'ionic-angular';

import { AngularFire, 
        FirebaseListObservable,
        AuthProviders, 
        AuthMethods} from 'angularfire2';

// Providers
import { AuthService } from '../../providers/auth-service';
import {  Utils } from '../../providers/utils';

//Pages
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
   
//    public loading;
    
    public user = {
        email: '',
        password: ''
    }
    /*public email = '';
    public password = '';*/

    
    //public loadingCtrl: LoadingController

    //items: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService, public menuCtrl: MenuController, public utils: Utils) {
   // this.items = af.database.list('/items');
       
        this.menuCtrl.enable(false);

    }

    // Login with credentials
    public login(): void {
        this.utils.showLoading();
       
        this._auth.login(this.user)
            .then(() => this.onLogInSuccess())
            .catch((error) => this.utils.showError(error));
    }  
    
    // Register with credentials
    public registerUser(): void {
        this.utils.showLoading();
        this._auth.registerUser(this.user)
            .then(() => this.onRegisterSuccess(this.user))
            .catch((error) => this.utils.showError(error));
    }  
    
    // SignIn with Facebook
    public signInWithFacebook(): void {
        this.utils.showLoading();
        this._auth.signInWithFacebook()
            .then(() => this.onSignInSuccess())
            .catch((error) => this.utils.showError(error));
    }
    
    // Success login with credentials
    public onLogInSuccess(): void {
        this.utils.loading.dismiss();
        this.menuCtrl.enable(true);
        this.navCtrl.push(ProductPage);
    }

    // Success SignIn with Facebook
    public onSignInSuccess(): void {
        console.log("Facebook display name ",this._auth.displayName());
        this.utils.loading.dismiss();
        this.menuCtrl.enable(true);
        this.navCtrl.push(ProductPage);
    }
    
    // Success registration
    private onRegisterSuccess(user): void {
        this.utils.loading.dismiss();
        this.utils.showMsg('Registro', 'Usuário registrado com sucesso!');  
    }

  /*  // Alert message
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
        this.loading.dismiss();
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

        setTimeout(() => {
        this.loading.dismiss();
        }, 3000);
    }*/

 /*   
    public showLoading() {
        let loading = this.loadingCtrl.create({
            content: 'Loading... Please wait.'
        });
        loading.present();
    }*/
    

}