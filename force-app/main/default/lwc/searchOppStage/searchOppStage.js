import { LightningElement } from 'lwc';
import findOpps from '@salesforce/apex/opportunityController.findOpps';


export default class SearchOppStage extends LightningElement {
searchKey = '';
opportunities;
error;

handleKeyChange(event) {
this.searchKey = event.target.value;
}

handleSearch() {
    findOpps({ searchKey: this.searchKey })
        .then((result) => {
            this.opportunities = result;
            this.error = undefined;
        })
        .catch((error) => {
            this.error = error;
            this.opportunities = undefined;
        });
        console.log(opportunities);
}



}