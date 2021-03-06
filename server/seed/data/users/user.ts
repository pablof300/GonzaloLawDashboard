import { Types } from "mongoose";

interface User {
    username: string;
    password: string;
    cases: Types.ObjectId[];
    firstName: string;
    secondName: String;
    middleName: String;
    otherName: String;
    address: {
        street: String;
        city: String;
        state: String;
        zip: Number;
    };
    company?: {
        companyLogoUrl: String;
        companyName: String;
        website: String;
    };
    contact: {
        homePhone: Number;
        workPhone: Number;
        cellPhone: Number;
        email: String;
    };
    birthDate: String;
    imageUrl: String;
    _id: Types.ObjectId;
}

const usersData: User[] = [
    {
        username: "pablo",
        password: "123456",
        firstName: "Pablo",
        secondName: "Estrada",
        cases: [new Types.ObjectId('16cb91bdc3464f14678934ca'), new Types.ObjectId('16cb91bdc3464f14678934cb'), new Types.ObjectId('16cb91bdc3464f14678934df')],
        middleName: "White",
        otherName: "BoneCracker",
        imageUrl: "https://react.semantic-ui.com/images/wireframe/square-image.png",
        address: {
            street: "7864 137th Ave W",
            city: "Orlando",
            state: "Florida",
            zip: 4567
        },
        contact: {
            cellPhone: 345786345,
            email: "pablof300@gmail.com",
            homePhone: 345223561,
            workPhone: 345223561
        },
        company: {
            companyLogoUrl: "https://1000logos.net/wp-content/uploads/2017/02/IBM-Logo-768x349.png" ,
            companyName: "IBM",
            website: "ibm.com",
        },
        birthDate: "03/08/1998",
        _id: new Types.ObjectId("5e37ac71d0ba8b3dd080516a")
    },
    {
        username: "robert",
        password: "robert",
        firstName: "Robert",
        secondName: "Mensah",
        cases: [new Types.ObjectId('16cb91bdc3464f14678934ca')],
        middleName: "Dubi",
        otherName: "Cat",
        imageUrl: "https://react.semantic-ui.com/images/wireframe/square-image.png",
        address: {
            street: "5906 129th Ave N",
            city: "Clearwater",
            state: "Florida",
            zip: 33467
        },
        company: {
            companyLogoUrl: "" ,
            companyName: "Cat PDF Inc",
            website: "catpdf.com",
        },
        contact: {
            workPhone: 345223561,
            cellPhone: 123456789,
            email: "edward@gmail.com",
            homePhone: 345223561
        },
        birthDate: "05/12/1990",
        _id: new Types.ObjectId("5e77ac71d0ba8b3dd080516a")
    },
    {
        username: "peter",
        password: "peter",
        firstName: "Peter",
        secondName: "Brown",
        cases: [new Types.ObjectId('16cb91bdc3464f14678934ca')],
        middleName: "White",
        otherName: "BoneCracker",
        imageUrl: "https://react.semantic-ui.com/images/wireframe/square-image.png",
        address: {
            street: "7864 137th Ave W",
            city: "Orlando",
            state: "Florida",
            zip: 4567
        },
        contact: {
            cellPhone: 345786345,
            email: "peter@gmail.com",
            homePhone: 345223561,
            workPhone: 345223561
        },
        birthDate: "03/08/1998",
        _id: new Types.ObjectId("2e77ac71d0ba8b3dd080516a")
    }
];

export = usersData;