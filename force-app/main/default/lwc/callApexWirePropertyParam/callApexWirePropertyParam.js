import { LightningElement, wire } from 'lwc';
import getAccounts  from '@salesforce/apex/AccountController1.getAccounts';
const DELAY = 300;

export default class CallApexWirePropertyParam extends LightningElement {
    searchText;

    @wire(getAccounts, {accsIndustry: '$searchText'}) accs;

    handleChange(event){
        let domainKey = event.target.value;
        setTimeout(() => { this.searchText = domainKey}, DELAY);
    }
}