import {createValidator} from 'express-joi-validation';

const schemaValidator = createValidator({
  passError: true,
});

export default schemaValidator;
