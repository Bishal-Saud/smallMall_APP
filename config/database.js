import mongoose from "mongoose";

/**
 * mongoose.set("strictQuery", false); sets Mongoose's query strictness to false.
 * This means that Mongoose will not return an error if you try to query for a
 * non-existent field. Instead, it will simply return an empty result.
 * With strict query set to true, Mongoose will return an error if you try to
 * query for a non-existent field.
 */
mongoose.set("strictQuery", false);

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection) {
      console.log(`connected to mongodb: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
    // using process.exit(1) in your code means that if there is a problem connecting to the database, your program will stop running with a special code (1) to let you and other programs know that something went wrong. This helps you identify and fix errors in your code and can also be used for automated error handling and monitoring. It's like a red flag that says, "There's a problem here!"
  }
};

export default connectToDB;
