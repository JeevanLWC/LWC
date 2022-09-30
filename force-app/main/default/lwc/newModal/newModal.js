import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import EMAIL_FIELD from '@salesforce/schema/Account.Owner.Email';
import PHONE_FIELD from '@salesforce/schema/Account.phone';
import ID_FIELD from "@salesforce/schema/Account.Id";


export default class NewModal extends LightningElement {
        // ApI name for App Builder setup
@api recordId;
@api objectApiName;
@api optionVal;



@track objectInfo;
@track recordTypeIdVal;
@track openmodel = true;

ifields = [REVENUE_FIELD, INDUSTRY_FIELD];
@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
objectInfo;

accountObject = ACCOUNT_OBJECT;
myFields = [ID_FIELD , NAME_FIELD, EMAIL_FIELD , PHONE_FIELD];

areDetailsVisible = false;
areDetailsVisible1 = true;
areDetailsVisible2 = true;
areDetailsVisible3 = false;
VisableIndicator = true;
MyId;

handleAccountCreated(){
    // Run code when account is created.
    this.selectedStep = 'Step3'
    this.areDetailsVisible = true;
    this.areDetailsVisible2 = true;
      
}


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
        this.areDetailsVisible3 = true;
        this.dispatchEvent(evt);
        console.log(event.detail.id);
        
    
       
    }

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Street = '32 Prince Street';
        this.template.querySelector('lightning-record-edit-form').submit(fields); 
        console.log('hs onsuccess: ', updatedRecord);
     }
     handleSucess(event){
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        
     }


    openModal() {
        this.openmodel = true
    }
    
    closeModal() {
        this.openmodel = false
    }

   

@track selectedStep = 'Step1';
 
handleNext() {
    var getselectedStep = this.selectedStep;
    if(getselectedStep === 'Step1'){
        this.selectedStep = 'Step2';
    }
    else if(getselectedStep === 'Step2'){
        this.selectedStep = 'Step3';
    }
    else if(getselectedStep === 'Step3'){
        this.selectedStep = 'Step4';
    }

    const rtis = this.objectInfo.data.recordTypeInfos;
    this.recordTypeIdVal=(Object.keys(rtis).find(rti => rtis[rti].name === this.optionVal));  
    this.areDetailsVisible1 = false;
   
}

handlePrev() {
    var getselectedStep = this.selectedStep;
    if(getselectedStep === 'Step2'){
        this.selectedStep = 'Step1';
    }
    else if(getselectedStep === 'Step3'){
        this.selectedStep = 'Step2';
    }
    else if(getselectedStep === 'Step4'){
        this.selectedStep = 'Step3';
    }
}
  
handleFinish() {
    alert('Finished...');
    this.selectedStep = 'Step1';
    this.openmodel = true;

}
  
selectStep1() {
    this.selectedStep = 'Step1';
}

selectStep2() {
    this.selectedStep = 'Step2';
}

selectStep3() {
    this.selectedStep = 'Step3';
    this.areDetailsVisible1 = false;
}

selectStep4() {
    this.selectedStep = 'Step4';
}

get isSelectStep4() {
    return this.selectedStep === "Step4";
}



}