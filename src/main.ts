import express from 'express';
import { productRoutes } from './presentation/routes/productRoutes';
import { userRoutes } from './presentation/routes/userRoutes';

const app = express();
app.use(express.json());

app.use('/', productRoutes);
app.use('/', userRoutes)

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});


export { app };