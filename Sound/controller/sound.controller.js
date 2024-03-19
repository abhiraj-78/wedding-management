import jwt from "jsonwebtoken";
import sound_vendor from "../model/sound.js";
import { validationResult } from "express-validator";

export const signUp = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });
 
    sound_vendor.create(request.body).then((res) => {
 
      let Token = jwt.sign(request.body,'vendorToken') ;

      return response.status(200).json({status: "User SignUp success",Token,res});
    })
    .catch((err) => {
      if (err.parent.errno === 1062)
        return response.status(200).json({status: "User already exist.." });
      return response.status(200).json({status: "Something went wrong" });
    });
};

export const signIn = async (request, response, next) => {
  let errors = validationResult(request);

  if (!errors.isEmpty())
    return response.status(500).json({ error: errors.array() });

  let user = await sound_vendor.findOne({
    where: { email: request.body.email },
    raw: true,
  });
  if (user) {
    let encryptedPassword = user.password;
    let originPassword = request.body.password;

    if (sound_vendor.checkPassword(originPassword, encryptedPassword))
      return response.status(200).json({ message: "User Login Successful" });
    return response.status(401).json({ error: "enter valid password" });
  } else {
    return response.status(401).json({ message: "Unauthorized User" });
  }
};

export const upDate = (request, response, next) => {
  // if (request.body.email.includes("@gmail.com")) {
    sound_vendor
      .update(request.body, { where: { id: request.body.id } })
      .then((res) => {
        console.log(res);
        if (res)
          return response.status(200).json({ data: "Data update successful" });
        return response.status(200).json({ data: "Data updation failed" });
      })
      .catch((err) => {
        console.log(err);
        if (err.parent.errno == 1062)
          return response.status(200).json({ data: "user already registerd" });
        return response.status(200).json({ data: "somthing went wront" });
      });
    
};

export const deleteSound = async(request,response,next)=>{
  try {
      const deletedVendor = await sound_vendor.destroy({where : request.body})
      console.log(deletedVendor);
      if(!deletedVendor)
          return response.status(401).json({message:"vendor not found"}) ;

      return response.status(200).json({message:"vendor delete success"}) ;
  } catch (error) {
        response.status(500).json({message : "something went wrong"}) ;
  }      
   
}