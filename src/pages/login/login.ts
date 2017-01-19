import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, 
        FirebaseListObservable,
        AuthProviders, 
        AuthMethods} from 'angularfire2';

import { HomePage } from '../home/home';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
   
    public user = {
        email: '',
        password: ''
    }
    /*public email = '';
    public password = '';*/

    
    //public loadingCtrl: LoadingController

    //items: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController,public  af: AngularFire, private _auth: AuthService, public menuCtrl: MenuController, private alertCtrl: AlertController, public loadCtrl : LoadingController) {
   // this.items = af.database.list('/items');
       
        this.menuCtrl.enable(false);

    }

    // Login with credentials
    public login(): void {
        this.showLoading();
        /*this.af.auth.login({
          email: this.user.email,
          password: this.user.password,
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        })*/
        this._auth.login(this.user)
            .then(() => this.onLogInSuccess())
            .catch((error) => this.showError(error));
    }  
    
    // Register with credentials
    public registerUser(): void {
        //console.log(this.user);
        this.showLoading();
        //this.showLoading();
        this._auth.registerUser(this.user)
            .then((user) => this.onRegisterSuccess(this.user))
            .catch((error) => this.showError(error));
    }  
    
    public signInWithFacebook(): void {
        this.showLoading();
        //.catch(error) => console.log('error');
        this._auth.signInWithFacebook()
            .then(() => this.onSignInSuccess())
            .catch((error) => this.showError(error));
    }
    
    public onLogInSuccess(): void {
        console.log("Loggged ",this.user.email);
        //this.loading.dismiss();
        this.menuCtrl.enable(true);
        this.navCtrl.push(ProductsPage);
    }

    // Success SignIn with Facebook
    public onSignInSuccess(): void {
        console.log("Facebook display name ",this._auth.displayName());
        //this.loading.dismiss();
        this.menuCtrl.enable(true);
        this.navCtrl.push(ProductsPage);
    }
    
    // Success registration
    private onRegisterSuccess(user): void {
        //console.log("Register user ",this.user);
        this.showMsg('Registro', 'Usuário registrado com sucesso!')       
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
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    }

    public showLoading() {
        let loading = this.loadCtrl.create({
            content: 'Please wait...'
        });

        loading.present(loading);

        setTimeout(() => {
        loading.dismiss();
        }, 3000);
    }

 /*   
    public showLoading() {
        let loading = this.loadingCtrl.create({
            content: 'Loading... Please wait.'
        });
        loading.present();
    }*/
    

}