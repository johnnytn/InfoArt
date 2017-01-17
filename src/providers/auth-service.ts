/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

import { Injectable } from '@angular/core';
import { AuthProviders, 
        /*FirebaseAuth, */
        AngularFire,
        /*AngularFireAuth,*/
        FirebaseAuthState,
        AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState;
    
    // Constructor with AngularFire
    constructor( public af: AngularFire ) {       
        this.af.auth.subscribe(auth => {
            this.authState = auth;
            //console.log(auth);
        });

    }

    get authenticated(): boolean {
        return this.authState !== null;        
    }

    // Sign with facebook
    signInWithFacebook(): firebase.Promise < FirebaseAuthState > {
        return this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }

    // Sign out
    signOut(): void {
       // this.auth$.logout();
         this.af.auth.logout();
    }

    // Display user name
    displayName(): string {
        if (this.authState != null) {
            return this.authState.facebook.displayName;
        } else {
            return '';
        }
    }
}