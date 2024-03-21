import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import form from "./controller/form.js";
import { alldata, singleUserData } from "./controller/getdata.js";

//configure env
dotenv.config();

//databse config
connectDB();

//ES module fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Express
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", (req, res) => {
  res.send({
    data: "shubham",
  });
});

app.post("/form", form);
app.get("/getdata", alldata);
app.get("/getdata/:username", singleUserData);

app.listen(process.env.PORT, () => {
  console.log(`connected to server to ${PORT}`);
});
