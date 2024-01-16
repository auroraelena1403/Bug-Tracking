import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteProject({params}){
    // console.log("stergere??");
   try {
    deleteItem({key:"projects", id:params.id});
    const associatedDetails=getAllMatchingItems({
        category:"projects",
        key:"projectId",
        value:params.id
    });
    associatedDetails.forEach((project)=>{
        deleteItem({key:"projects", id:project.id})
    })

    toast.success("Project deleted!");
   } catch (error) {
    throw new Error ("There was a problem deleting the project!");
   }

   return redirect("/");
}