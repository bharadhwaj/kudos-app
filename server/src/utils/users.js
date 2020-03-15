import { hashSync } from 'bcryptjs';

import UserModel from '../models/users.model';

import { utils } from '../constants';

const userData = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'johnsmith@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 1,
  },
  {
    firstName: 'Reema',
    lastName: 'Levine',
    email: 'reemalevine@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 1,
  },
  {
    firstName: 'Aled',
    lastName: 'Lin',
    email: 'aledlin@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 1,
  },
  {
    firstName: 'Freyja',
    lastName: 'Simmons',
    email: 'freyjasimmons@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 1,
  },
  {
    firstName: 'Damian',
    lastName: 'Wells',
    email: 'damianwells@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 1,
  },
  {
    firstName: 'Lucie',
    lastName: 'Lawson',
    email: 'lucielawson@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 2,
  },
  {
    firstName: 'Codey',
    lastName: 'Mendez',
    email: 'codeymendez@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 2,
  },
  {
    firstName: 'Magnus',
    lastName: 'Woodley',
    email: 'magnuswoodley@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 2,
  },
  {
    firstName: 'Dominique',
    lastName: 'Thatcher',
    email: 'dominiquethatcher@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 2,
  },
  {
    firstName: 'Susie',
    lastName: 'Tate',
    email: 'susietate@example.com',
    password: hashSync('password', utils.SALT_ROUND),
    organisationId: 2,
  },
];

const addUserData = async () => {
  await UserModel.bulkCreate(userData);
};

export default addUserData;
