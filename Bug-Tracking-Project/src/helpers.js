export const generateRandomColor =()=>{
    const existingProjectsLength=fetchData("projects")?.length ?? 0;
    
    return `${existingProjectsLength *34} 65% 50%`
}

export const waitF =()=> new Promise(res=> setTimeout(res, Math.random()*800));

//lcl storage
export const fetchData=(key)=>{
    return JSON.parse(localStorage.getItem(key));
};

//f pt eliminare btn delete user si eliminare nume
export const deleteItem = ({ key , id}) => {
    const existingData=fetchData(key);
    if(id){
        const newData=existingData.filter((item)=>item.id !==id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
    
}

export const createBugReport=({
    title
})=>{
    const newItem={
        id:crypto.randomUUID(),
        title:title,
        createdAt:Date.now(),
        
        color:generateRandomColor()
    }
    const existingProjects=fetchData("projects") ?? [];
    return localStorage.setItem("projects", JSON.stringify([...existingProjects, newItem]));
}

//details
export const addDetails=({
    description, steps, assignedTo, projectId
})=>{
    const newItem={
        id:crypto.randomUUID(),
        description:description,
        steps:steps,
        assignedTo:assignedTo,
        createdAt:Date.now(),
        projectId:projectId
    }
    const existingDetails=fetchData("details") ?? [];
    return localStorage.setItem("details", JSON.stringify([...existingDetails, newItem]));
}

export const formatDateToString = (epoch)=>new Date(epoch).toLocaleDateString();

export const getAllMatchingItems =({category, key, value})=>{
    const data=fetchData(category) ?? [];
    return data.filter((item)=>item[key]===value);
}
// export const deleteDetail=({key, id})=>{
//     const existingData=fetchData(key);
//     if(id){
//         const newData=existingData.filter((item)=>item.id !==id);
//         return localStorage.setItem(key. JSON.stringify(newData));
//     }
//     return localStorage.removeItem(key);
// }