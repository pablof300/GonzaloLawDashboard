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
        title: "Mr. Trevor",
        type: 'Client Appointment',
        startDate: new Date("2020-03-25T08:00:00"),
        endDate: new Date("2020-03-25T09:00:00"),
        admins: [new Types.ObjectId('99cb91bdc3464f14678934ca')],
        users: [new Types.ObjectId('39cb91bdc3464f14678934ca')],
        _id: new Types.ObjectId('49cb91bdc3464f14678934ca')
    }
];

export = eventData;
