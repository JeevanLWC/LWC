import { LightningElement } from 'lwc';

export default class passingData_Child extends LightningElement {
    Message ='hello';
dispatch(){
    let evt = new CustomEvent('myevent',{ detail:this.Message});
    this.dispatchEvent(evt);
  
}

}