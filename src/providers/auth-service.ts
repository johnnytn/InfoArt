/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

import { Injectable } from '@angular/core';
import { AuthProviders, 
        AuthMethods,
        AngularFire,
        FirebaseAuthState } from 'angularfire2';

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
    public signInWithFacebook(): firebase.Promise < FirebaseAuthState > {
        return this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }
    
      public login(user): firebase.Promise < FirebaseAuthState > {
        
        return this.af.auth.login({
          email: user.email,
          password: user.password,
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        });
          
    } 
    
    public registerUser(user): firebase.Promise < FirebaseAuthState > {
        return this.af.auth.createUser(user);
    } 
    
  /*  signInWithFacebook() : firebase.Promise < FirebaseAuthState > {
        console.log('logging with FB');
        let self = this;
       return this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        }).then(function(response){
            console.log('logged with FB');
            let user = {
                email : response.auth.email,
                picture : response.auth.photoURL
            }
            window.localStorage.setItem('user', JSON.stringify(user));
            self.navCtrl.pop();
        }).catch(function(error){
            console.log(error);
        });
    }*/

    // Sign out
    public signOut(): void {
         this.af.auth.logout();
    }

    // Display user name
    public displayName(): string {
        if (this.authState != null) {
            return this.authState.facebook.displayName;
        } else {
            return '';
        }
    }
}