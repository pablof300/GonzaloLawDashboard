import { Schema, Types, Mongoose } from 'mongoose';

interface Admin {
    username: String;
    password: String;
    firstName: String;
    secondName: String;
    middleName: String;
    imageUrl: String;
    clients: Types.ObjectId[]
    _id: Types.ObjectId
}

const adminsData: Admin[] = [
    {
        username: "herman",
        password: "123456",
        firstName: "Herman",
        secondName: "Park",
        middleName: "E.",
        imageUrl: "https://react.semantic-ui.com/images/avatar/large/chris.jpg",
        clients: [],
        _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516f')
    },
    {
        username: "tyler",
        password: "123456",
        firstName: "Tyler",
        secondName: "Maple",
        middleName: "B.",
        imageUrl: "https://react.semantic-ui.com/images/avatar/large/ade.jpg",
        clients: [new Types.ObjectId('5e77ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516d')
    },
    {
        username: "edward",
        password: "123456",
        firstName: "Edward",
        secondName: "Mingle",
        middleName: "T.",
        imageUrl: "https://react.semantic-ui.com/images/wireframe/image.png",
        clients: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a'), new Types.ObjectId('5e77ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516e')
    }
];

export = adminsData;
