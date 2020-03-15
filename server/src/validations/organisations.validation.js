import Joi from '@hapi/joi';

export const limitAndOffset = Joi.object({
  params: {},
  query: {
    offset: Joi.number().min(0),
    limit: Joi.number().positive(),
  },
  body: {},
});

export const getOrganisationUsers = Joi.object({
  params: { organisationId: Joi.number().positive() },
  query: { offset: Joi.number().min(0), limit: Joi.number().positive() },
  body: {},
});
