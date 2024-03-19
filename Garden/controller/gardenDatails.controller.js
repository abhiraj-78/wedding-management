// import { validationResult } from 'express-validator';
import GardenDetails from '../models/gardenDetails.model.js';
// import { request, response } from 'express';

export const signin = async (request, response, next) => {

    response.status(200).json("signIn success")

    try {
        const { email, password } = request.body;

        const gardenobj = await GardenDetails.findOne({ where: { email }, raw: true });

        if (gardenobj && GardenDetails.checkPassword(password, gardenobj.password))
            return response.status(200).json({ message: "Sign In Success", gardenobj });

        return response.status(401).json({ error: "Unauthorized user" });
    } catch (err) {
        console.error(err);
        if (err.parent.errno == 1062)
            return response.status(500).json({ error: "email id is already present..." });
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export const signup = async (request, response, next) => {
    
    // console.log(request.files[0].originalname);
    // console.log("image url : ",imageUrl);
    // return response.status(200).json({message:"hello garden"})

    try {
        console.log(request.body);
        const { name, email, password, location, capacity, contactNo, rentalFee, description } = request.body;
        const imageUrl = request.files[0].originalname
        
        await GardenDetails.create({
            name, email, password, location, capacity, contactNo, rentalFee, imageUrl, description
        });
        return response.status(200).json({ message: "Sign Up Success" });
    } catch (err) {
        // console.error("Hello Satish : "+err.parent.errno);
        console.log(err);
        if ((err.parent.errno) == 1062)
            return response.status(500).json({ error: "user is already present..." });
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
export const viewProfile = async (request, response, next) => {
    try {
        const id = request.params.id;
        const gardenobj = await GardenDetails.findOne({ where: { id } });
        if (gardenobj)
            return response.status(200).json({ message: "View Profile success...", gardenobj });
        return response.status(401).json({ error: "Unauthorized user" });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export const removeFromCart = async (request, response, next) => {
    try {
        let gardenobj = await GardenDetails.findOne({ where: request.body  });
        
        if (!gardenobj) {
            return response.status(404).json({ error: "Garden not found" });
        }

        await GardenDetails.destroy({ where: { id: gardenobj.id } });

        return response.status(200).json({ message: "Item removed", removedItem: gardenobj });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateGarden = async (request, response, next) => {
    try {
        const { id } = request.params;
        const { name, email, password, location, capacity, contactNo, rentalFee, imageUrl, description } = request.body;

        let gardenobj = await GardenDetails.findOne({ where: { id } });
        if (!gardenobj) {
            return response.status(404).json({ error: "Garden not found" });
        }

        const updatedGarden = await gardenobj.update({
            name, email, password, location, capacity, contactNo, rentalFee, imageUrl, description
        });
        if (updatedGarden) {
            return response.status(200).json({ message: "Garden updated successfully", data: updatedGarden });
        } else {
            return response.status(500).json({ error: "Failed to update garden" });
        }
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });

    }
}
