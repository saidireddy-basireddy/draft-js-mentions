// tslint:disable:max-line-length

import {
  IUserDetails
} from '../../components/interfaces';
const img = require('./person.png');
export const mentions: Array<IUserDetails> = [
  {
    ID: 1,
    DisplayName: 'Admin',
    AccountName: 'admin@dev.com',
    UserProfileURL: '#',
    UserImageURL: img,
    JobTitle: 'Admin',
    CellPhone: '1234567',
    WorkPhone: '1234567'
  },
  {
    ID: 2,
    DisplayName: 'User1',
    AccountName: 'user1@dev.com',
    UserProfileURL: '#',
    UserImageURL: img,
    JobTitle: 'Dev',
    CellPhone: '12345678',
    WorkPhone: '12345678'
  },
  {
    ID: 3,
    DisplayName: 'User1',
    AccountName: 'user1@dev.com',
    UserProfileURL: '#',
    UserImageURL: img,
    JobTitle: 'Manager',
    CellPhone: '123456789',
    WorkPhone: '123456789'
  },
  {
    ID: 4,
    DisplayName: 'User2',
    AccountName: 'user2@dev.com',
    UserProfileURL: '#',
    UserImageURL: img,
    JobTitle: 'Sales',
    CellPhone: '12356789',
    WorkPhone: '12356789'
  },
  {
    ID: 5,
    DisplayName: 'User3',
    AccountName: 'user3@dev.com',
    UserProfileURL: '#',
    UserImageURL: img,
    JobTitle: 'Lead',
    CellPhone: '1236789',
    WorkPhone: '1236789'
  }
];