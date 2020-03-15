import Sequelize from 'sequelize';

import { sequelize } from '../lib/sequelize';

import OrganisationModel from './organisations.model';

const UserModel = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    organisationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'organisations',
        key: 'id',
      },
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

OrganisationModel.hasMany(UserModel);

export default UserModel;
