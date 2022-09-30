import { LightningElement } from 'lwc';

export default class ContactList extends LightningElement {
    contacts = [
        {
            name:'david',
            salary:300000,
            city:"delhi",
            email:"david@test.com",
            id:'c01'
        },
        {
            name:'rahul',
            salary:3000001,
            city:"noida",
            email:"rahul@test.com",
            id:'c02'
        },
        {
            name:'swayam',
            salary:2000000,
            city:"kolkata",
            email:"swayam@test.com",
            id:'c03'
        },
        {
            name:'sagnik',
            salary:5000000,
            city:"bangalore",
            email:"sagnik@test.com",
            id:'c04'
        },
        {
            name:'ponnu',
            age:30,
            city:"chennai",
            email:"ponnu@test.com",
            id:'c05'
        }                
    ];
}