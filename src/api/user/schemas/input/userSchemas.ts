import * as Joi from 'joi';

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required(),
  password: Joi.string().required(),
});

const updatePasswordSchema = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required(),
  password: Joi.string().required(),
});

export {createUserSchema, updatePasswordSchema};
