import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
//APEX-Methods
import getAccounts from '@salesforce/apex/SfWiki_Handler.getAccounts'
import getContacts from '@salesforce/apex/SfWiki_Handler.getContacts'

export default class PImodal extends LightningElement {
    step;
    showSpinner;

            // ApI name for App Builder setup
@api recordId;
@api objectApiName;
@api optionVal;

@track objectInfo;
@track recordTypeIdVal;
@track openmodel = true;

fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
objectInfo;



get recordTypeId() {
    
// Returns a map of record type Ids
    
    var recordtypeinfo = this.objectInfo.data.recordTypeInfos;
    var uiCombobox = [];

    console.log("recordtype" + recordtypeinfo);
    
    for(var eachRecordtype in  recordtypeinfo)//this is to match structure of lightning combo box
    {
    if(recordtypeinfo.hasOwnProperty(eachRecordtype))
    uiCombobox.push({ label: recordtypeinfo[eachRecordtype].name, value: recordtypeinfo[eachRecordtype].name })
    }
    //console.log('uiCombobox' + JSON.stringify(uiCombobox));
    return uiCombobox;
}


changeHandler(event){
    this.optionVal=event.target.value;
}


handleChange(event) {
        // Returns a map of record type Ids
        const rtis = this.objectInfo.data.recordTypeInfos;
       
        this.recordTypeIdVal=(Object.keys(rtis).find(rti => rtis[rti].name === this.optionVal));
    
}

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }


    //First Page
    showFirstPage = true;
    listOfAccounts;
    accountColumns = [
        {label: 'Name', fieldName: 'Name', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Phone', fieldName: 'Phone', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Website', fieldName: 'Website', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Industry', fieldName: 'Industry', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', sortable: false, wrapText: false, hideDefaultActions: true,
            typeAttributes: {minimumFractionDigits: 2, maximumFractionDigits: 2},
            cellAttributes: {alignment: "left"}}
    ];

    //Second Page
    showSecondPage;

    //Third Page
    showThirdPage;
    listOfContacts;
    contactColumns = [
        {label: 'Name', fieldName: 'Name', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Title', fieldName: 'Title', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Phone', fieldName: 'Phone', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Email', fieldName: 'Email', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true},
        {label: 'Department', fieldName: 'Department', type: 'text', sortable: true, wrapText: false, hideDefaultActions: true}
    ];

    connectedCallback() {
        this.getInitData();
    }

    getInitData() {
        this.showSpinner = true;
        getAccounts({})
            .then(data => {
                this.listOfAccounts = data;
                this.showSpinner = false;
            })
            .catch(error => {
                console.log(error);
            });
    }

    nextPage(event) {
        this.setAllStepsToFalse();
        this.step = event.target.value;

        if(this.step === "1") {
            this.showFirstPage = true;
        } else if(this.step === "2") {
            this.showSecondPage = true;
        } else if(this.step === "3") {
            this.showSpinner = true;
            getContacts({})
                .then(data => {
                    this.listOfContacts = data;
                    this.showSpinner = false;
                    this.showThirdPage = true;
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    previousPage(event) {
        this.setAllStepsToFalse();
        this.step = event.target.value;

        if(this.step === "1") {
            this.showFirstPage = true;
        } else if(this.step === "2") {
            this.showSecondPage = true;
        }
    }

    setAllStepsToFalse() {
        this.showFirstPage = false;
        this.showSecondPage = false;
        this.showThirdPage = false;
    }

}