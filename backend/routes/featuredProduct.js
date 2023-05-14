import express from 'express';
import { getPublichKey, stripePayment, updateToFeature, cancelPayment } from '../controllers/featuredProController.js'

const router = express.Router()

router.get('/config',getPublichKey)

router.post('/create-payment-intent',stripePayment)

router.patch('/update-feature', updateToFeature)

router.post('/cancel-payment',cancelPayment)

export default router;