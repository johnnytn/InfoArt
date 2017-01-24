import { Component } from '@angular/core';

import { 
  NavController } from 'ionic-angular';

/*import { AngularFire, FirebaseListObservable } from 'angularfire2';*/

// Providers
import { AuthService } from '../../providers/auth-service';

// Pages
import { LoginPage } from '../login/login';

@Component({ 
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    //songs: FirebaseListObservable < any > ;

    constructor(public navCtrl: NavController, private _auth: AuthService) {
        
        let authenticated = this._auth.authenticated;
        console.log(authenticated);
        if(!authenticated){
            this.navCtrl.push(LoginPage);
        }
    }
  
}