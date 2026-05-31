import mongoose from "mongoose";
import dns from "dns";

async function connectToDB() {
  try {
    // Use public DNS servers to help resolve Atlas SRV records (works around blocked/filtered DNS)
    try {
      dns.setServers(["1.1.1.1", "8.8.8.8"]);
      console.log("Custom DNS servers set: 1.1.1.1, 8.8.8.8");
    } catch (dnsErr) {
      console.warn("Failed to set custom DNS servers:", dnsErr.message || dnsErr);
    }
    await mongoose
      .connect(process.env.MONGODB_URL)
      console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
   process.exit(1);
  }
}

export default connectToDB;
