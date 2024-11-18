import { Router } from 'express';
import { productController } from "../../config/product";
import { validateCreateProduct } from '../../validators/product/validateCreateProduct';
import { validateIncreaseStock } from '../../validators/product/validateIncreaseStock';
import { validateDecreaseStock } from '../../validators/product/validateDecreaseStock';
import { validateFindProductById } from '../../validators/product/validateFindProductById';
import { validateUpdateProduct } from '../../validators/product/validateUpdateProduct';

const router = Router();

router.get('/:id', validateFindProductById, (req, res) => productController.findById(req, res));
router.get('/', (req, res) => productController.findAll(req, res));
router.get('/category/:id', (req, res) => productController.findByCategory(req, res));

router.post('/create', validateCreateProduct, (req, res) => productController.create(req, res));
router.post('/increase-stock', validateIncreaseStock, (req, res) => productController.increaseStock(req, res));
router.post('/decrease-stock', validateDecreaseStock, (req, res) => productController.decreaseStock(req, res));

router.put('/:id', validateUpdateProduct, (req, res) => productController.update(req, res))

export { router as productRoutes };