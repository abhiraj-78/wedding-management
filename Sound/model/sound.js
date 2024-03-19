import { DataTypes } from "sequelize";
import sequelize from "../dbCongi/dbConnection.js";
import bcrypt from "bcryptjs";

const soundVendor = sequelize.define("sound_vendor", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    set(value) {
      console.log("Value : " + value);
      let saltKey = bcrypt.genSaltSync(10);
      let encryptedPassword = bcrypt.hashSync(value, saltKey);
      console.log("encryptedPassword : " + encryptedPassword);
      this.setDataValue("password", encryptedPassword);
    },
  },
  address: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});


soundVendor.checkPassword = (originalPassword, encryptedPassword) => {
  console.log("password called");
  let a = bcrypt.compareSync(originalPassword, encryptedPassword);
  console.log(a);
  return a;
};

sequelize.sync()
  .then(() => {
    console.log("table created");
  })
  .catch((err) => {
    console.log(err);
    console.log("table not created");
  });

export default soundVendor;
