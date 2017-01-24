import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, 
        MenuController } from 'ionic-angular';

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
    
    public user = {
        email: '',
        password: ''
    }

    constructor(public navCtrl: NavController, private _auth: AuthService, public menuCtrl: MenuController, public utils: Utils, public storage: Storage) {
        
        // Get the local storage data
        this.storage.get('email').then((val) => {
            console.log('Your email is', val);
            this.user.email = val;
         });
        
        this.storage.get('password').then((val) => {
            console.log('Your password is', val);
            this.user.password = val;
         });
       
        this.menuCtrl.enable(false);
    }

    // Login with credentials
    public login(): void {
        this.utils.showLoading();
        // Set data into the local storage
        this.storage.set('email', this.user.email);
        this.storage.set('password', this.user.password);
        
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
        this.navCtrl.push(HomePage);
    }

    // Success SignIn with Facebook
    public onSignInSuccess(): void {
       /* console.log("Facebook display name",this._auth.displayName());*/
        
        this.utils.loading.dismiss();
        this.menuCtrl.enable(true);
        this.navCtrl.push(HomePage);
    }
    
    // Success registration
    private onRegisterSuccess(user): void {
        this.utils.loading.dismiss();
        this.utils.showMsg('Registro', 'Usuário registrado com sucesso!');  
    }

}