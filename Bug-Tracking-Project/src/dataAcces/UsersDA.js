import Users from "../models/Users.js";

async function createUser(user){
    try {
        return await Users.create(user)
    } catch(err) {
        console.log(err)
    }
}

async function getUsers(){
    return await Users.findAll();
}

async function getUserByName(userName) {
    return await Users.findAll({where: {Name: userName}});
}

async function deleteUser(id){
    let elem = await Users.findByPk(id);

    if (!elem){
        console.log("This elem does not exist")
        return;
    }

    return await elem.destroy();
}


export {
    createUser,
    getUsers,
    deleteUser,
    getUserByName
}