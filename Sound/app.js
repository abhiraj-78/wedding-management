import express from 'express' ;
import bodyParser from 'body-parser'; //it convert raw data into usable formate,it is used to encode data from server 
import SoundRouter from './router/sound.router.js';
import SoundInfoRouter from './router/sound_info.router.js';

import path from 'path';
import { fileURLToPath } from 'url';

const  __filename = fileURLToPath(import.meta.url) ;

const  __dirname = path.dirname(__filename) ;

// console.log("__filename : ",__filename);
// console.log("__dirname : ",__dirname);
// console.log("path join",path.join(__dirname,"public"));

let app = express();

app.use(bodyParser.urlencoded({extended:true})) ; // use method is use to add middleware in our application 
app.use(bodyParser.json()) ;

app.use(express.static(path.join(__dirname,"public"))) ;
app.use('/soundProfile',SoundRouter);
app.use('/soundInfo',SoundInfoRouter);


app.listen(3003,()=>{
    console.log("server started") ;
});