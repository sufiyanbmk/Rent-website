import authRouter from './auth';
import { Application } from 'express';
import authRoute from './auth';
import adminRoute from './admin'

const routes = (app:Application) =>{
  app.use('/api/auth', authRoute)
  app.use('/api/adminRoute', adminRoute )
}


export default routes