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
        title: "Mr. Estrada",
        type: 'Client Appointment',
        startDate: new Date("2020-03-25T08:00:00"),
        endDate: new Date("2020-03-25T09:00:00"),
        admins: [new Types.ObjectId('5e77ac71d0ba8b3dd080516e')],
        users: [new Types.ObjectId('5e37ac71d0ba8b3dd080516a')],
        _id: new Types.ObjectId('49cb91bdc3464f14678934ca')
    }
];

export = eventData;
