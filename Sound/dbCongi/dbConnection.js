import Sequelize from 'sequelize' ;

const sequelize = new Sequelize("vivah","root","Abhiraj$78",{
    dialect : 'mysql' , host : 'localhost'
}) ;    

sequelize.authenticate().then(()=>{
    console.log("Database connected");
}).catch(()=>{
    console.log("Database not connected");
})

export default sequelize ;