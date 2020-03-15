import Sequelize from 'sequelize';

import { sequelize } from '../lib/sequelize';

const OrganisationModel = sequelize.define(
  'organisations',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
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

export default OrganisationModel;
