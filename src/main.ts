import express from 'express';
import { productRoutes } from '@/presentation/routes/productRoutes';
import { userRoutes } from '@/presentation/routes/userRoutes';
import { categoryRoutes} from '@/presentation/routes/categoryRoutes'
import { authRoutes } from '@/presentation/routes/authRoutes';

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/login', authRoutes)

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

export { app };