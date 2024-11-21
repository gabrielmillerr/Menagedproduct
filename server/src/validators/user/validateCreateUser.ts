import Joi from 'joi';

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be at most 128 characters long.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters long.',
    }),
});

export const validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};