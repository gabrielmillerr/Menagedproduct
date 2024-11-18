import { Router } from "express";
import { categoryController} from "@/config/categories"

const router = Router();

router.post('/create', (req, res) => categoryController.create(req, res));
router.put('/update/:id', (req, res) => categoryController.update(req, res));
router.get('/', (req, res) => categoryController.findAll(req, res));
router.get('/:id', (req, res) => categoryController.findById(req, res));

export { router as categoryRoutes };