import { Router } from "express";
import { authController } from '@/config/auth';

const router = Router();

router.post('/', (req, res) => authController.login(req, res));

export { router as authRoutes };