import { LightningElement } from 'lwc';

export default class inputDemo extends LightningElement {
    greeting ;

    handleClick(event) {
        this.greeting = event.target.value;
    }
}
