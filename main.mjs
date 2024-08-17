import express from "express";
import cors from "cors";
import managerRouter from "./routes/manager.router.mjs";
import employeeRouter from "./routes/employee.router.mjs";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/manager", managerRouter);
app.use("/employee", employeeRouter);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});