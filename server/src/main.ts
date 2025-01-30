import express from 'express';
import { productRoutes } from '@/presentation/routes/productRoutes';
import { userRoutes } from '@/presentation/routes/userRoutes';
import { categoryRoutes} from '@/presentation/routes/categoryRoutes'
import { authRoutes } from '@/presentation/routes/authRoutes';
import { errorHandler, notFoundHandler } from '@/presentation/middleware/middlewareReponse';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/login', authRoutes)

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = 3002;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

export { app };