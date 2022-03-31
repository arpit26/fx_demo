import { track } from "lwc";
import { LightningElement } from 'lwc';
import callFunction from '@salesforce/apex/uowController.callFunction';


export default class UowDataTest extends LightningElement {

    @track firstName = '';
    @track lastName = '';
    @track accountName = '';
    @track subject = '';
    @track description = '';
    @track nextpage = false;


    handleFNameChange(event){
        this.firstName = event.target.value;
    }
    handleLChange(event){
        this.lastName = event.target.value;
    }
    handleSubjectChange(event){
        this.subject = event.target.value;
    }
    handleaccNameChange(event){
        this.accountName = event.target.value;
    }
    handledespChange(event){
        this.description = event.target.value;
    }
    

    handleSubmit(event) {
        callFunction({firstName: this.firstName,lastName : this.lastName,accountName: this.accountName,subject : this.subject, description : this.description})
        .then( data => {
            if(data === null){
             console.log('data1234 ');
            }
            else {
            this.nextpage = true;
                 console.log('data1234 '+ data.accountId);
            }
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}