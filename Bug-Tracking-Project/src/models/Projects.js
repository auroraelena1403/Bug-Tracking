import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Projects = db.define("Projects", 
{
    ProjectId:
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
    RepositoryLink:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Projects;