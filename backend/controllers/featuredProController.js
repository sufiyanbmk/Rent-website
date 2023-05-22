import dotenv  from "dotenv"
import Stripe from 'stripe';
import Product from '../models/productSchema.js'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECERET_KEY, {
  apiVersion: '2022-08-01',
});

export const getPublichKey = async(req,res) => {
  try{
    res.send({publishableKey:process.env.STRIPE_PUBLISHABLE_KEY})
  }catch(err){
    res.status(404).status({success:false,messagefalse})
  }
}

export const stripePayment = async (req,res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "INR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
      description: "Your description here", 
    });
    res.send({
      clientSecret: paymentIntent.client_secret,paymentId:paymentIntent.id
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
}

export const updateToFeature = async(req,res) => {
  const { proID,plan,price } = req.body
  const currentDate = new Date()
  const expireDate = new Date(currentDate.setMonth(currentDate.getMonth() + plan));
  
  try{
    await Product.updateOne({ _id:proID }, { $push: { featured: { plan, price, expireDate } } })
    res.status(200).send('product updated to featured')
  }catch(err){
    res.status(500).send("Error updating product to featured");
  }
} 

export const cancelPayment = async(req,res) => {
  const {paymentId} = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentId);
    console.log('Payment Intent was cancelled:', paymentIntent.id);
    res.status(200).send('payment canceled')
  } catch (error) {
    console.error('Error cancelling Payment Intent:', error);
    res.status(500).send("Error");
  }
}