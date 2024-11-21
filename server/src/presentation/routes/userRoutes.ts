import { Router } from "express";
import { userController } from "@/config/user";
import { validateCreateUser } from "@/validators/user/validateCreateUser"

const router = Router();

router.get('/:id', (req, res, next) => userController.findById(req, res, next));
router.get('/:email', (req, res, next) => userController.findByEmail(req, res, next));
router.post('/create', validateCreateUser, (req, res, next) => userController.create(req, res, next));

export { router as userRoutes }