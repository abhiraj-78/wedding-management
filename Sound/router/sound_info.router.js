import {createProfile,updateDetails,viewProfile} from '../controller/sound_info.controller.js' ;
import express from 'express' ;
import multer from 'multer'
import { body } from 'express-validator';
let router = express.Router() ;

let upload = multer({dest : "public/images/"}) ;

router.post("/createProfile",upload.single("image"),body("vendor_id").notEmpty(),body("vendor_id").notEmpty()
,body("type").notEmpty(),
body("charges").isNumeric(),
body("description").isAlpha(),
body("status").isAlpha(),createProfile) ;

router.get("/viewProfile",viewProfile) ;

router.post("/update",body("vendor_id").notEmpty(),body("vendor_id").notEmpty()
,body("type").notEmpty(),
body("charges").isNumeric(),
body("description").isAlpha(),
body("status").isAlpha(),updateDetails) ;

export default router ;



