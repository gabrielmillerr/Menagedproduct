import { Router } from "express";
import { userController } from "@/config/user";
import { validateCreateUser } from "@/validators/user/validateCreateUser"

const router = Router();

router.get('/users/:id', (req, res) => userController.findById(req, res));
router.get('/users/:email', (req, res) => userController.findByEmail(req, res));
router.post('/users/create', validateCreateUser, (req, res) => userController.create(req, res));

export { router as userRoutes }

