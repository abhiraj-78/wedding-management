import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import GardenRouter from './routes/gardenDetails.route.js';
import PhotoGrapherRouter from "./routes/photoGrapher.js";
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// app.use("/garden", GardenRouter);
app.get("/photographer",(req,res)=>{
    res.status(200).json("Hello React...")
} );

// app.use("/category",CategoryRouter);
// app.use("/product",ProductRouter);
// app.use("/cart",CartRouter);

app.listen(3002, () => {
    console.log("Server Started...");
});

