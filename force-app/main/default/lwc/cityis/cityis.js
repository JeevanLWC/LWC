import { api, LightningElement } from 'lwc';

export default class Cityis extends LightningElement {
    @api city ;
    @api name ;

    handleChange(event){
        this.msg = event.target.value;
        console.log('Msg :', this.msg)
    }
    
    handleClick(event) {
        this.city = event.target.value;
        console.log(this.city);
    }
    handleClick(event1) {
        this.name = event1.target.value;
        console.log(this.name);
    }
}