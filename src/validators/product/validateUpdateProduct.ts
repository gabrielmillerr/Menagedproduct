import Joi from 'joi';

const updateProductSchema = Joi.object({
  name: Joi.string().max(256).optional(),
  price: Joi.number().greater(0).optional(),
  stock: Joi.number().integer().min(0).optional(),
});

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};