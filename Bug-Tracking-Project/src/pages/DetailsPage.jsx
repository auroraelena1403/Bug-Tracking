import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function detailsLoader(){
    
    const details=fetchData("details");
    

    return { details};

}

export async function detailsAction({request}){
    const data=await request.formData();
    
    const {_action, ...values}=Object.fromEntries(data);
    if(_action==="deleteDetail"){ 
        try {
            //dtls
            deleteItem({
                key:"details",
                id:values.detailId
            })
            return toast.success("Bug deleted!");
        } catch (error) {
            throw new Error("There was a problem deleting the bug.");
        }
    }
}


const DetailsPage =()=>{
    const {details}=useLoaderData();
    return(
        <div className="grid-lg">
            <h1>All bugs</h1>
            {
                details && details.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent bugs <small>({details.length} total)</small>
                        </h2>
                        <Table details={details}/>
                    </div>)
                    :
                    (<p>No bugs to show</p>)   
                
            }

        </div>
    )
}

export default DetailsPage;