import app from "./app.js";
import connectToDB from "./config/database.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 5005;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`App is running at http:localhost:${PORT}`);
});
