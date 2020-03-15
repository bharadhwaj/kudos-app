import Joi from '@hapi/joi';

import { regex } from '../constants';

export const createUser = Joi.object({
  params: {},
  query: {},
  body: {
    firstName: Joi.string()
      .trim()
      .regex(regex.NAME)
      .required(),
    lastName: Joi.string()
      .trim()
      .regex(regex.NAME)
      .allow(''),
    email: Joi.string()
      .trim()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .trim()
      .required(),
    organisationId: Joi.number()
      .positive()
      .required(),
  },
});

export const login = Joi.object({
  params: {},
  query: {},
  body: {
    email: Joi.string()
      .trim()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .trim()
      .required(),
  },
});

export const giveKudos = Joi.object({
  params: {
    userId: Joi.number()
      .positive()
      .required(),
  },
  query: {},
  body: {
    receiverUserId: Joi.number()
      .positive()
      .required(),
    comments: Joi.string()
      .trim()
      .allow(''),
  },
});
