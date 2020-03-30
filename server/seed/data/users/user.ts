import { Schema, Types } from 'mongoose';

interface User {
  username: string;
  password: string;
  _id: Types.ObjectId;
}

const usersData: User[] = [
  {
    username: "pablo",
    password: "123456",
    _id: new Types.ObjectId('29cb91bdc3464f14678934ca')
  },
  {
    username: "trevor",
    password: "123456",
    _id: new Types.ObjectId('39cb91bdc3464f14678934ca')
  }
];

export = usersData;
