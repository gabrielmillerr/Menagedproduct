import { Router } from 'express';
import { productController } from "../../config/product";
import { validateCreateProduct } from '../../validators/product/validateCreateProduct';
import { validateIncreaseStock } from '../../validators/product/validateIncreaseStock';
import { validateDecreaseStock } from '../../validators/product/validateDecreaseStock';
import { validateFindProductById } from '../../validators/product/validateFindProductById';
import { validateUpdateProduct } from '../../validators/product/validateUpdateProduct';

const router = Router();

router.get('/products/:id', validateFindProductById, (req, res) => productController.findById(req, res));
router.get('/products', (req, res) => productController.findAll(req, res));

router.post('/products/create', validateCreateProduct, (req, res) => productController.create(req, res));
router.post('/products/increase-stock', validateIncreaseStock, (req, res) => productController.increaseStock(req, res));
router.post('/products/decrease-stock', validateDecreaseStock, (req, res) => productController.decreaseStock(req, res));

router.put('/products/:id', validateUpdateProduct, (req, res) => productController.update(req, res))

export { router as productRoutes };