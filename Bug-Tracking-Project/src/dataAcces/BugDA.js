import Bugs from "../models/Bugs.js";

async function createBug(bug){
    return await Bugs.create(bug)
}

async function getBugs(){
    return await Bugs.findAll();
}

async function deleteBug(id){
    let elem = await Bugs.findByPk(id);

    if (!elem){
        console.log("This elem does not exist")
        return;
    }

    return await elem.destroy();
}

async function getBugsForProject(projectId){
    return await Bugs.findAll({
        where: {
            ProjectId : projectId
        }
    });
}


export {
    createBug,
    getBugs,
    deleteBug,
    getBugsForProject
}