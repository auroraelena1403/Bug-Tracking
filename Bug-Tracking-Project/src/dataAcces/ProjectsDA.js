import Projects from "../models/Projects.js";

async function createProject(project){
    try {
        return await Projects.create(project)
    } catch(err) {
        console.log(err)
    }
}

async function getProjects(){
    return await Projects.findAll();
}



async function deleteProject(id){
    let elem = await Projects.findByPk(id);

    if (!elem){
        console.log("This elem does not exist")
        return;
    }

    return await elem.destroy();
}

async function getProjectByName(name){

    return await Projects.findAll({
        where : {
            Name : name
        }
    });
}

async function getProjectById(id){
    return await Projects.findByPk(id);
}


export {
    createProject,
    getProjects,
    deleteProject,
    getProjectByName,
    getProjectById
}