import { Sequelize } from "sequelize";

const sequelize = new Sequelize("garden", "root", "Abhiraj$78", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Datbase connected....");
    }).catch(err => {
        console.log("Database Connection Failed..");
        console.log(err);
    });

export default sequelize;