import express from 'express';

import userRoutes from './users.route';
import organisationRoutes from './organisations.route';

const v1Router = express.Router();

v1Router.use('/users', userRoutes);
v1Router.use('/organisations', organisationRoutes);

export default v1Router;
