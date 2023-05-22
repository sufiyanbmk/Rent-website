import { ProductRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/productRepository";

export const productDbRepository = (repository:ReturnType<ProductRepositoryMongoDB>) => {
  const getAll = async () => await repository.getAllProducts()

  const getOneProduct = async(proId:string) => await repository.getProduct(proId)

  const deleteOneProduct = async(proId:string) => await repository.deleteProduct(proId)

  const reprots = async() => await repository.getReportedProducts()

  const getProductCount = async () => await repository.getProductCount();

  const getProductGraph =async () => await repository.getProductGraph();

  const getPieChartData =async () => await repository.getPieChart()


  return{
    getAll,
    getOneProduct,
    deleteOneProduct,
    reprots,
    getProductCount,
    getProductGraph,
    getPieChartData
  } 
}

export type ProductDbInterface = typeof productDbRepository;