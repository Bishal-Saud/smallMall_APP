import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://localhost:5017",
    credentials: true,
  })
);
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoutes);

app.use("/ping", (req, res) => {
  res.send("PONG");
});

app.all("*", (req, res) => {
  res.status(400).send("OOPS ! 404 Page not found !!");
});

export default app;
