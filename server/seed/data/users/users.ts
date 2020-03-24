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
    _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516a')
  },
  {
    username: "hutch",
    password: "123456",
    _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516b')
  },
  {
    username: "nate",
    password: "123456",
    _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516c')
  }
];

export = usersData;
