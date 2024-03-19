import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import bcyrpt from "bcryptjs";

const PhotoGrapher = sequelize.define("photoGrapher", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            let saltKey = bcyrpt.genSaltSync(10);
            let encryptedPassword = bcyrpt.hashSync(value, saltKey);
            this.setDataValue("password", encryptedPassword);
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceCharge: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    ,
    contactNo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
PhotoGrapher.checkPassword = (originalPassword, encryptedPassword) => {
    console.log("check Password called....");
    return bcyrpt.compareSync(originalPassword, encryptedPassword);
}

sequelize.sync()
    .then((result) => {
        console.log("User table created...." + result);
    }).catch(err => {
        console.log("Something wrong...");
        console.log(err);
    });

export default PhotoGrapher;

