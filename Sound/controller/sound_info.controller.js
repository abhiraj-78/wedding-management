import SoundDetails from "../model/sound_info.js";
import { validationResult } from "express-validator";

export const createProfile = (request,response,next)=>{
    let errors = validationResult(request) ;
    
    if(!errors.isEmpty())
        return response.status(500).json({error :errors.array()})

    console.log("In create profile");
    let filename = request.file.filename ; //images.png
    let vendor_id = request.body.vendor_id ;
    let type =request.body.type ;
    let image = "images/"+filename ;
    let charges = request.body.charges ;
    let contact = request.body.contact ;
    let description = request.body.description ;
    let status = request.body.status ;

    SoundDetails.create({vendor_id,type,image,charges,contact,description,status})
    .then(res=>{
        if(res._options.isNewRecord)    
                return response.status(200).json({data : res}) ;
      })
    .catch(err=>{   
        console.log(err);
        return response.status(401).json({error : err}) ;
    });
}

export const viewProfile = (request,response,next)=>{

    SoundDetails.findOne(request.body,{raw: true}).then(res=>{
        console.log(res);
        return response.status(200).json({data : res})
    }).catch((error)=>{
        return response.status(404).json({err : error})
    })
}

export const updateDetails = (request,response,next)=>{

    let errors = validationResult(request) ;
    if(!errors.isEmpty())
        return response.status(500).json({error :errors.array()}) ;

    console.log("Inside disable");
    SoundDetails.update(request.body,{where : {id : request.body.id}}).then(res=>{
        if(res)
            return response.status(200).json({message : "account active success "})
        return response.status(200).json({status : "account disable success"}) ;
    }).catch(err=>{
        console.log(err);
        return response.status(401).json({message : "internal server error" , error : err}) ;
    }) ;
}