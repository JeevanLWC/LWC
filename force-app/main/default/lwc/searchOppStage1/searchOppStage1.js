import { LightningElement } from 'lwc';

export default class SearchOppStage1 extends LightningElement {
    searchStage;

    handleChange(event){
        this.searchStage = event.target.value;
        console.log('search stage: ', event.target.value);
    }

    handleClick(){
        console.log(this.searchStage );
        const selectedEvent = new CustomEvent('filterstage', { detail: this.searchStage });
        this.dispatchEvent(selectedEvent);
    }
}
