import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Bugs = db.define("Bugs", 
{
    BugId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ProjectId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    BugDescription: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Severity: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    AssignedTo:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Bugs;