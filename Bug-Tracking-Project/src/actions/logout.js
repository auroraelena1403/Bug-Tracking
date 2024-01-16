import { redirect } from "react-router-dom"; 
import {deleteItem} from "../helpers";

//toastify
import { toast } from "react-toastify";

export async function logoutAction(){
    deleteItem({
        key:"userName"
    })
    deleteItem({
        key:"projects"
    })
    deleteItem({
        key:"details"
    })
    toast.success("You have deleted your account!");
    return redirect("/")
}