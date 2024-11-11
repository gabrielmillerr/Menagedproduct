import Joi from 'joi';

const decreaseStockSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.empty': 'Product ID is required.',
    'string.guid': 'Product ID must be a valid UUID.',
  }),
  quantity: Joi.number().integer().greater(0).required().messages({
    'number.base': 'Quantity must be a number.',
    'number.integer': 'Quantity must be an integer.',
    'number.greater': 'Quantity must be greater than zero.',
    'any.required': 'Quantity is required.',
  }),
});

export const validateDecreaseStock = (req, res, next) => {
  const { error } = decreaseStockSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};