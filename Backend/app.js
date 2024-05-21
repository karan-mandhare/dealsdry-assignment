import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);

export { app };
