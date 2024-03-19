import express from "express";
import { body } from "express-validator";

import { signUp, signIn, upDate ,deleteSound} from "../controller/sound.controller.js";
import { verifyVendor } from "../verify/verifyToken.js";

const   router = express.Router();

router.post(
  "/signUp",
  body("name").notEmpty(),
  body("name").isAlpha(),
  body("contact").isNumeric(),
  body("contact").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 12 }).notEmpty(),
  body("address").notEmpty(),
  signUp
);

router.post(
  "/signIn",
  body("email").isEmail(),
  body("password").notEmpty().isLength({ min: 5 }),verifyVendor,
  signIn
);

router.post(
  "/update",
  body("name").notEmpty(),
  body("name").isAlpha(),
  body("contact").isNumeric(),
  body("contact").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("address").notEmpty(),
  upDate
);

router.delete("/deleteSound",deleteSound)
export default router;
