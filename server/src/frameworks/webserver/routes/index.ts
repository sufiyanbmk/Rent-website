import { Application } from 'express';
import authRouter from './auth';
import adminRouter from './admin'
import userRouter from './user';
import productRouter from './product';
import featuredRouter from './featured';

const routes = (app:Application) =>{
  app.use('/api/auth', authRouter())
  app.use('/api/admin', adminRouter())
  app.use('/api/user', userRouter())
  app.use('/api/products', productRouter())
  app.use('/api/featured', featuredRouter())
}


export default routes