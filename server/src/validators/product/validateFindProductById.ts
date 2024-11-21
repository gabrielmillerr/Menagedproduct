import Joi from 'joi';

const findProductByIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.empty': 'Product ID is required.',
    'string.guid': 'Product ID must be a valid UUID.',
  }),
});

export const validateFindProductById = (req, res, next) => {
  const { error } = findProductByIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};