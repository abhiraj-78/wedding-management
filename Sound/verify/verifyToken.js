import jwt from 'jsonwebtoken' ;

export const verifyVendor = (request,response,next)=>{
    try {
        let token = request.headers.authorization ;
        console.log(token);

        token = token.split(' ')[1]
        jwt.verify(token,'vendorToken')
        next()
        // response.status(200).json({message:token}) ;
    } catch (error) {
        console.log(error);
        return response.json({error})
    }
}

