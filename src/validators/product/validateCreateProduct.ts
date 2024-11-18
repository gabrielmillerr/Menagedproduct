// validators/productValidator.ts

import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be at most 128 characters long.',
    }),
  price: Joi.number()
    .greater(0)
    .required()
    .messages({
      'number.base': 'Price must be a number.',
      'number.greater': 'Price must be a positive number.',
      'any.required': 'Price is required.',
    }),
  stock: Joi.number()
    .integer()
    .min(0) // O estoque não pode ser negativo
    .optional()
    .default(0) // Se não fornecido, o padrão será 0
    .messages({
      'number.base': 'Stock must be a number.',
      'number.integer': 'Stock must be an integer.',
      'number.min': 'Stock cannot be negative.',
    }),
  categories: Joi.array()
    .items({id: Joi.string().uuid()})
    .optional()
    .default([])
    .messages({
      'array.base': 'Categories must be an array of strings.',
      'string.uuid': 'Categories must be valid UUIDs.',
    }),  
});

export const validateCreateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};
