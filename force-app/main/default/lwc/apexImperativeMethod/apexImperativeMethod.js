// apexImperativeMethod.js
import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class apexImperativeMethod extends LightningElement {
    @track  accs;
    @track error;

    handleLoad() {
        getAccounts()
            .then(result => {
                this.accs = result;
            })
            .catch(error => {
                this.error = error;
            });
    }
}