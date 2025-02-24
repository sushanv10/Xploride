const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD,{
    host:process.env.MYSQL_HOST,
    dialect: "mysql"
});

const connectDB= async () => {
    try {
        await sequelize.authenticate();
        console.log('MySql connected via Sequelize');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
        
    }
}

module.exports = {sequelize, connectDB};