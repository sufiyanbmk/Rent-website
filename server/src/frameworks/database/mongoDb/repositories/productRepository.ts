import Products from "../models/productModel";

export const productRepositoryMongoDB = () => {
  const getAllProducts = async () => await Products.find();

  const getProduct = async (proId: string) => await Products.findById(proId);

  const deleteProduct = async (proId: string) =>
    await Products.findByIdAndDelete(proId);

  const getReportedProducts = async () =>
    await Products.find({ reports: { $size: 1 } })
      .populate({
        path: "reports",
        select: "username report",
        model: "Report",
      });

  const getProductCount = async () => 
    await Products.countDocuments();

  const getProductGraph = async() =>{
    const counts = await Products.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    return counts;
  }
    
  const getPieChart = async () => {
    const featuredProduct = await Products.countDocuments({ featured: { $exists: true, $ne: [] } });
    const product = await Products.countDocuments({ featured: { $exists: false, $not: { $gt: 0 } } });
    return { product: product, featuredProduct: featuredProduct };
  };

  return {
    getAllProducts,
    getProduct,
    deleteProduct,
    getReportedProducts,
    getProductCount,
    getProductGraph,
    getPieChart
  };
};

export type ProductRepositoryMongoDB = typeof productRepositoryMongoDB;
