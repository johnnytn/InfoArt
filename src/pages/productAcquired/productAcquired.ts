import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Providers
import { Utils } from '../../providers/utils';

@Component({ 
    selector: 'page-productAcquired',
    templateUrl: 'productAcquired.html'
})
export class ProductAcquiredPage {


    products: FirebaseListObservable < any > ;

    constructor( private af: AngularFire) {
        //this.products = af.database.list('/products');
        
        this.products  = af.database.list('/products', {
          query: {
              orderByChild: 'acquired',
              equalTo: true
          }
        });
        
        //this.utils.loading.dismiss()
            //.then(() => this.utils.loading.dismiss())
          //  .catch((error) => this.utils.showError(error));
        
        //this.utils.loading.dismiss();
    }
 
   
    
}