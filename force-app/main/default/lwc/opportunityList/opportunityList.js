import { LightningElement, wire } from 'lwc';
import getOppsStageFilter from '@salesforce/apex/opportunityController.getOppsStageFilter';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    { label: 'Stage', fieldName: 'StageName'}
];


export default class OpportunityList extends LightningElement {
    opportunities;
    columns = columns;
    error;
    stageInput=''; //undefined

   


    @wire(getOppsStageFilter ,{stage:'$stageInput'})
    wiredOpps({ error, data }) {
        if (data) {
            this.opportunities = data;
            console.log('opp: ', this.opportunities);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.log('error: ', this.error);
            this.opportunities = undefined;
        }
    }
   
    handleStage(event){
        this.stageInput = event.detail;
        console.log('stage received: ', event.detail);
    }

}