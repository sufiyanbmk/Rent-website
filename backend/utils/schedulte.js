import schedule from 'node-schedule'
import Product from '../models/productSchema.js'

const checkForExpire = () =>{
  schedule.scheduleJob('0 0 * * *', async () => {
    const currentDate = new Date();
    const expiredProducts = await Product.find({
      featured: { $elemMatch: { expireDate: { $lte: currentDate } } },
    });
    expiredProducts.forEach(async (product) => {
      product.featured = null;
      await product.save();
    });
  });
} 

export default checkForExpire;