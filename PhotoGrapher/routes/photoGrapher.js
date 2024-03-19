import express from "express";
import { signin, signup, remove, update } from "../controller/photoGrapher.controller.js";
import { body } from "express-validator";
// import { viewProfile } from "../controller/gardenDatails.controller.js";
const router = express.Router();

// http://localhost:3000/vendore/

// router.get("/signup",
//     body("email", "Invalid Email Id").isEmail(),
//     body("password", "Password is required").notEmpty(),
//     body("password", "Password must have at least 5 letter").isLength({ min: 5 }),
//     body("name", "Name is required").notEmpty(),
//     body("name", "Only alphabates are allowed").isAlpha(),
//     signup);


router.post("/signup", body("name").isEmpty().isAlpha(),
body("email").isEmail().isEmpty(),
body("password").isLength({min:6,max:10}).isAlphanumeric(),
body("location","location is not empty").isEmpty(),
body("capacity").isEmpty(),
body("contactNo").isEmpty().isNumeric().isLength({min:10}),
body("rentalFee").isNumeric().isEmpty(),
body("imageUrl").isString().isEmpty(),
body("description").isEmpty(),signup);
router.post("/signin", signin);

// router.get("/viewprofile",viewProfile)

router.delete('/remove/:id', remove);
router.post('/update/:id', update);

export default router;

