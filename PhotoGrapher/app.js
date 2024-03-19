import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/photographer",(req,res)=>{
    res.status(200).json("Hello React...")
} );

app.listen(3002, () => {
    console.log("Server Started...");
});

