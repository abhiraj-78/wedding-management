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
      let saltKey = bcrypt.genSaltSync(10);
      let encryptedPassword = bcrypt.hashSync(value, saltKey);
      this.setDataValue("password", encryptedPassword);
    },
  },
  address: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});


soundVendor.checkPassword = (originalPassword, encryptedPassword) => {
  let a = bcrypt.compareSync(originalPassword, encryptedPassword);
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
