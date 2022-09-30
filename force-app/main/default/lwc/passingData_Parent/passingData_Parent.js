import { LightningElement } from 'lwc';

export default class PassingData_Parent extends LightningElement {

handleEvent(event){
        console.log('Parent FIRED');
        msg = event.detail;
        console.log(msg);

    }
    
}