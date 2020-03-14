import Sequelize from 'sequelize';

import { sequelize } from '../lib/sequelize';

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

export default UserModel;
