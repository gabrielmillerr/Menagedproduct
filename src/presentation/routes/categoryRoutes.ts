import { Router } from "express";
import { categoryController} from "@/config/categories"

const router = Router();

router.post('/create', (req, res, next) => categoryController.create(req, res, next));
router.put('/update/:id', (req, res, next) => categoryController.update(req, res, next));
router.get('/', (req, res, next) => categoryController.findAll(req, res, next));
router.get('/:id', (req, res, next) => categoryController.findById(req, res, next));

export { router as categoryRoutes };