import { LightningElement , wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class WireProperty extends LightningElement {
    @wire(getAccounts) accs;

}