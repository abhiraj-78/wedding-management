
import { DataTypes } from "sequelize";
import sequelize from "../dbCongi/dbConnection.js";

const soundVendorDetails = sequelize.define("sound_vendor_details",{
    vendor_id :{
        type : DataTypes.INTEGER ,
        references : {
            model : "sound_vendors",
            key : "id"
        },
        allowNull : false 
    },
    type : {
        type : DataTypes.STRING,
        allowNull : false ,
    },
    image : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    charges : { 
        type : DataTypes.INTEGER ,
        allowNull : false    
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false      
    },
    status : {
        type : DataTypes.BOOLEAN ,
        allowNull :false 
    }
})

sequelize.sync().then(()=>{
    console.log("table is created");
}).catch(()=>{
    console.log("table is not created");
})

export default soundVendorDetails ;