import { Schema, Types } from 'mongoose';

interface User {
  username: string;
  password: string;
}

const usersData: User[] = [
  {
    username: "pablo",
    password: "123456",
  }
];

export = usersData;
