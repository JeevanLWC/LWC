import { LightningElement ,wire} from 'lwc';
import {publish, MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/test_lms__c';

export default class PublishComp extends LightningElement {
    msg;
    @wire(MessageContext) 
    messageContext;

handleChange(event){
    this.msg = event.target.value;
    console.log('Msg :', this.msg)
}

handleSubmit(){
    publish(this.messageContext, SAMPLE_MESSAGE, {message: this.msg});	
    console.log('Msg :', this.msg)
    }
}	
