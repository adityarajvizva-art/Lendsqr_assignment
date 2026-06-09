import express from "express";
import { usersRoutes } from "./modules/users/routes/users.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "Demo Credit Wallet API is running"
  });
});

app.use("/api/v1/users", usersRoutes);

export default app;