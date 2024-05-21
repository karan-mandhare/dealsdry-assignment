import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to the Databse", connection.connection.host);
  } catch (err) {
    console.log("ERROR!! Failed to connect with mongodb");
  }
};

export default connectToMongodb;
