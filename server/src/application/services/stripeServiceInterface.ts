import { StripeServiceImpl } from "../../frameworks/services/stripeService";

export const stripeServiceInterface = (service:ReturnType<StripeServiceImpl>) => {
 const add = async (amount:number) => service.create(amount)

 const callOff = async(paymentId:string) => service.cancel(paymentId)

 return{
    add,
    callOff
 }

}

export type StripeServiceInterface = typeof stripeServiceInterface;