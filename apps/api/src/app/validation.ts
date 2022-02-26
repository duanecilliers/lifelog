import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  // PORT: Joi.number().default(3000),
  NX_ADMIN_EMAIL: Joi.string().email().required(),
  NX_ADMIN_PASSWORD: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  NX_JWT_SECRET: Joi.string().min(12).required(),
});
