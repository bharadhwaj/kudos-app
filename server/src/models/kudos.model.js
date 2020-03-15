import Sequelize from 'sequelize';

import { sequelize } from '../lib/sequelize';

import UserModel from './users.model';

const KudosModel = sequelize.define(
  'kudos',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    comments: {
      type: Sequelize.STRING(2047),
    },
  },
  {
    freezeTableName: true,
  }
);

KudosModel.belongsTo(UserModel, {
  as: 'givenByUser',
});
KudosModel.belongsTo(UserModel, {
  as: 'receivedByUser',
});

export default KudosModel;
