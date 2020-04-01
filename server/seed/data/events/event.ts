import { Schema, Types } from 'mongoose';

interface Event {
    title: string,
    type: string,
    startDate: Date,
    endDate: Date,
    admins: Types.ObjectId[],
    users: Types.ObjectId[],
    _id: Types.ObjectId
}

const eventData: Event[] = [
    {
        title: "Casual chat",
        type: 'Casual chat',
        startDate: new Date("2020-03-25T08:00:00"),
        endDate: new Date("2020-03-25T09:00:00"),
        admins: [new Types.ObjectId('5e77ac71d0ba8b3dd080516e')],
        users: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('49cb91bdc3464f14678934ca')
    },
    {
        title: "Signing documents",
        type: 'Signing documents',
        startDate: new Date("2020-04-02T08:00:00"),
        endDate: new Date("2020-04-02T09:00:00"),
        admins: [new Types.ObjectId('5e77ac71d0ba8b3dd080516e')],
        users: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('59cb91bdc3464f14678934ca')
    },
    {
        title: "Outreach",
        type: 'Outreach',
        startDate: new Date("2020-03-30T08:00:00"),
        endDate: new Date("2020-03-30T09:00:00"),
        admins: [new Types.ObjectId('5e77ac71d0ba8b3dd080516e')],
        users: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('69cb91bdc3464f14678934ca')
    },
    {
        title: "Signing documents",
        type: 'Signing documents',
        startDate: new Date("2020-03-17T08:00:00"),
        endDate: new Date("2020-03-17T09:00:00"),
        admins: [new Types.ObjectId('5e77ac71d0ba8b3dd080516e')],
        users: [new Types.ObjectId('2e77ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('99cb972dc3464f14678934ca')
    }
];

export = eventData;
