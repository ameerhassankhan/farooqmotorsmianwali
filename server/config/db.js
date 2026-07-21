import mongoose from 'mongoose';
import config from 'config';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${config.get("MONGO_URI")}/farooqmotorsmianwali`, {

    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;   