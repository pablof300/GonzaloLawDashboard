import { Schema, Types } from 'mongoose';

interface User {
  username: string;
  password: string;
  clients: Types.ObjectId[],
  _id: Types.ObjectId
}

const adminData: User[] = [
  {
    username: "tyler",
    password: "123456",
    clients: [],
    _id: new Types.ObjectId('99cb91bdc3464f14678934ca')
  },
  {
    username: "hutch",
    password: "123456",
    clients: [],
    _id: new Types.ObjectId('19cb91bdc3464f14678934ca')
  }
];

export = adminData;
