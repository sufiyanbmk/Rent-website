import mongoose from "mongoose"
import configKeys from "../../../config"
mongoose.set('strictQuery',true)


const connectDB = async () => {
  console.log(configKeys.mongoDbUrl)
  try {
    await mongoose.connect(configKeys.mongoDbUrl)
    console.log(`Database connected successfully`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB