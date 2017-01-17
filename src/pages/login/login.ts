import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../home/home';
import { Products } from '../products/products';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

    items: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, af: AngularFire, private _auth: AuthService, private menuCtrl: MenuController) {
   // this.items = af.database.list('/items');
       
        this.menuCtrl.enable(false);

    }

    signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
    }

    private onSignInSuccess(): void {
        console.log("Facebook display name ",this._auth.displayName());
        this.menuCtrl.enable(true);
        this.navCtrl.push(Products);
    }
    

}