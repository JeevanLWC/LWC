import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController2.getAccounts';

export default class ApexWireMethodToFunction extends LightningElement {
    accs;    
    error;
   @wire(getAccounts) accsMethod({error, data}){
        if(data) {
         this.accs  =  data;
          this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accs = undefined;
        }
    }
}