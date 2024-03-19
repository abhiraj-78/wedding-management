import jwt from 'jsonwebtoken' ;

export const verifyVendor = (request,response,next)=>{
    try {
        let token = request.headers.authorization ;
        console.log(token);

        token = token.split(' ')[1]
        
        console.log(token);
        jwt.verify(token,'vendorToken')
        next()
    } catch (error) {
        console.log(error);
        return response.status()
    }
}

