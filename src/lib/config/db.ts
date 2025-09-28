import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://clinicall:clinicall24702@clinicall.eh1libe.mongodb.net/clinicalldb"
  );
  console.log("DB Connected Succefull");
};
