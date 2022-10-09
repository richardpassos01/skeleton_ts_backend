import * as Joi from 'joi';

const authenticateUserSchema = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required(),
  password: Joi.string().required(),
});

export {authenticateUserSchema};
