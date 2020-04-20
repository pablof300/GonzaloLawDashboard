import { Schema, Types } from 'mongoose';

interface User {
  username: string;
  password: string;
  _id: Types.ObjectId;
  avatar: string;
  realName: string;
}

const usersData: User[] = [
  {
    username: "pablo",
    password: "123456",
    _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516a'),
    avatar: "https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2.avatar",
    realName: "Pablo Estrada"
  },
  {
    username: "hutch",
    password: "123456",
    _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516b'),
    avatar: "https://i.groupme.com/200x150.jpeg.6f275572e9ac4e74a548e82d18d96202.avatar",
    realName: "Hutch VanDyke"
  },
  {
    username: "nate",
    password: "123456",
    _id: new Types.ObjectId('5e77ac71d0ba8b3dd080516c'),
    avatar: "https://i.groupme.com/1024x1024.jpeg.9855215c76124dd685fcab3208fab18b.avatar",
    realName: "Nathaniel Stull"
  }
];

export = usersData;