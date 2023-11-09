import { config } from "dotenv";
config();
import app from "./app.js";
import connectToDB from "./config/database.js";

const PORT = process.env.PORT || 5005;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`App is running at http://localhost:${PORT}`);
});
