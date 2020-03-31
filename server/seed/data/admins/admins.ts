import { Schema, Types, Mongoose } from 'mongoose';

interface Admin {
    username: String;
    password: String;
    clients: Types.ObjectId[]
    _id: Types.ObjectId
}

const adminsData: Admin[] = [
    {
        username: "herman",
        password: "123456",
        clients: [],
        _id: new Types.ObjectId('5e37ac71d0ba8b3dd080516a')
    },
    {
        username: "tyler",
        password: "123456",
        clients: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516d')
    },
    {
        username: "edward",
        password: "123456",
        clients: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a'), new Types.ObjectId('5e77ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516e')
    }
];

export = adminsData;
