import mongoose from "mongoose";

type ConnectioObject = {
  isConnected?: number;
};

const connection: ConnectioObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected.");
    return;
  }
  try {
    
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
}

export default dbConnect;
