import {ProductDataInterface} from '../../../types/productInterface'
import { S3serviceInterface } from '../../services/s3ServiceInterface';

export async function addSignedUrl(
    product:ProductDataInterface[],
    s3Services:ReturnType<S3serviceInterface>
):Promise<ProductDataInterface[]>{
    const promises = product.map(async (product : any) => {
        const signedUrls = await Promise.all(product.image.map(s3Services.getFile));
        product.link = signedUrls;
        product.set("link",signedUrls,{strict:false})
        return product;
    });
    
    const productsWithSignedUrls = await Promise.all(promises);  
    return productsWithSignedUrls;
}