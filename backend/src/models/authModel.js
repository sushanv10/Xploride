const {DataTypes, UUID} = require('sequelize');
const {sequelize}= require('../config/db');

const User = sequelize.define('users', {
    userId:{
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true
    },

    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password:{ 
        type: DataTypes.STRING,
        allowNull: false
    },

    phone:{
        type: DataTypes.BIGINT,
        allowNull:false
    },

    address:{
        type: DataTypes.STRING,
        allowNull: false
    },

    role:{
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    timestamps: true
});

module.exports = User;