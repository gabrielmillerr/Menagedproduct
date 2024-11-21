import { Router } from "express";
import { authController } from '@/config/auth';

const router = Router();

router.post('/', (req, res, next) => authController.login(req, res, next));

export { router as authRoutes };