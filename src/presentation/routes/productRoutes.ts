import { Router } from 'express';
import { productController } from "../../config/product";
import { validateCreateProduct } from '../../validators/product/validateCreateProduct';
import { validateIncreaseStock } from '../../validators/product/validateIncreaseStock';
import { validateDecreaseStock } from '../../validators/product/validateDecreaseStock';
import { validateFindProductById } from '../../validators/product/validateFindProductById';
import { validateUpdateProduct } from '../../validators/product/validateUpdateProduct';

const router = Router();

router.get('/:id', validateFindProductById, (req, res, next) => productController.findById(req, res, next));
router.get('/', (req, res, next) => productController.findAll(req, res, next));
router.get('/category/:id', (req, res, next) => productController.findByCategory(req, res, next));

router.post('/create', validateCreateProduct, (req, res, next) => productController.create(req, res, next));
router.post('/increase-stock', validateIncreaseStock, (req, res, next) => productController.increaseStock(req, res, next));
router.post('/decrease-stock', validateDecreaseStock, (req, res, next) => productController.decreaseStock(req, res, next));

router.put('/:id', validateUpdateProduct, (req, res, next) => productController.update(req, res, next))

export { router as productRoutes };