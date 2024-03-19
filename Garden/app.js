import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import GardenRouter from './routes/gardenDetails.route.js';
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3001, () => {
    console.log("Server Started...");
});

app.use("/garden",GardenRouter);

