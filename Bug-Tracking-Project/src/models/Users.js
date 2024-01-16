import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Users = db.define("Users", 
{
    UserId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: 
    {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Email:
    {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Password:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    UserType:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Users;