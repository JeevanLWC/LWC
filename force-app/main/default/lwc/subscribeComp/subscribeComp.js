import { LightningElement ,wire} from 'lwc';
import {subscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/test_lms__c';

export default class SubscribeComp extends LightningElement {
messageRecived;
@wire(MessageContext) messageContext;

connectedCallback(){  //one of the life cycle hook
    subscribe(this.messageContext,SAMPLE_MESSAGE, (result) => this.handleMessage(result) );
}

handleMessage(result){
    //logic
    this.messageRecived = result.message;
    console.log('recieved in Subscribe comp !');
}
}
