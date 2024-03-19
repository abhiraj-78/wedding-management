// import { validationResult } from 'express-validator';
import PhotoGrapher from '../models/photoGrapher.model.js';
// import { request, response } from 'express';

export const signin = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const pvgrapherobj = await PhotoGrapher.findOne({ where: { email }, raw: true });

        if (pvgrapherobj && PhotoGrapher.checkPassword(password, pvgrapherobj.password))
            return response.status(200).json({ message: "Sign In Success", data: pvgrapherobj });
        return response.status(401).json({ error: "Unauthorized user" });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}


export const signup = async (request, response, next) => {
    try {
        const { name, email, password, type, serviceCharge, contactNo, imageUrl, description } = request.body;
        await PhotoGrapher.create({
            name, email, password, type, serviceCharge, contactNo, imageUrl, description
        });
        return response.status(200).json({ message: "Sign Up Success" });
    } catch (err) {
        console.error(err);
        if (err.parent.errno * 1 == 1062)
            return response.status(500).json({ error: "Email id is already registered..." });
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
export const remove = async (request, response, next) => {
    try {
        let pvgrapherobj = await PhotoGrapher.findOne({ where: { id: request.params.id * 1 } });
        if (!pvgrapherobj) {
            return response.status(404).json({ error: "Garden not found" });
        }
        await PhotoGrapher.destroy({ where: { id: pvgrapherobj.id } });
        return response.status(200).json({ message: "Item removed", removedItem: pvgrapherobj });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export const update = async (request, response, next) => {
    try {
        const { id } = request.params;
        const { name, email, password, location, capacity, contactNo, rentalFee, imageUrl, description } = request.body;

        let pvgrapherobj = await PhotoGrapher.findOne({ where: { id } });
        if (!pvgrapherobj) {
            return response.status(404).json({ error: "Garden not found" });
        }

        const updatedPhotoGraapher = await pvgrapherobj.update({
            name, email, password, location, capacity, contactNo, rentalFee, imageUrl, description
        });

        if (updatedPhotoGraapher) {
            return response.status(200).json({ message: "Garden updated successfully" });
        } else {
            return response.status(500).json({ error: "Failed to update garden" });
        }
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
