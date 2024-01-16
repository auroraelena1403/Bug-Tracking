import { Link, useLoaderData } from "react-router-dom";

//helper func
import { addDetails, createBugReport, deleteItem, fetchData, waitF } from "../helpers"
//toastify
import { toast } from "react-toastify";

//comp
import AddProjectForm from "../components/AddBugForm";
import Intro from "../components/Intro";
import AddDetailsForm from "../components/AddDetailsForm";
import ProjectItem from "../components/BugItem";
import Table from "../components/Table";
import {generateRandomColor} from "../helpers.js"

let userName = undefined;
let projects = [];
let details = [];
// //functie pt load
export function dashboardLoader(){
    //verificare existenta bug

    return {userName, projects, details};

}

export async function dashboardAction({request}){
    await waitF();
    //pt request userName (post)
    const data=await request.formData();
    //console.log({data, request}); OK
    //const userName=data.get("userName");
    //console.log({userName}); OK
    const {_action, ...values}=Object.fromEntries(data);
    //use case erori actions
    if(_action ==="newUser"){
        try {
        // throw new Error('incercare afisare mesaj eroare ?')
            await fetch("http://localhost:9000/api/users", {
                method:"POST",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({Name:values.userName,Email:values.email,Password:values.password,UserType:values.userType})
            });
            
            await fetch("http://localhost:9000/api/users/"+values.userName)
            .then((res) => res.json())
            .then((res)=> userName = res[0].Name);
            return toast.success(`Welcome ${values.userName}`); 
        } catch (error) {
        throw new Error("An unknown error occurred. Please try again later. :(");
        }
    }
    if(_action==="createProject"){ //salvare in ls
        try {
            await fetch("http://localhost:9000/api/projects", {
                method:"POST",
    
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({Name:values.projectTitle, RepositoryLink:values.repositoryLink})
            });

            await fetch("http://localhost:9000/api/projects")
            .then((res) => res.json())
            .then((res)=> projects = res.map(
                (el) => {
                    return {
                        ProjectId : el.ProjectId,
                        ProjectName : el.Name,
                        RepositoryLink : el.RepositoryLink,
                        color : generateRandomColor()
                    }
                }
            ));
    
            return toast.success("Project Added");
        } catch (error) {
            throw new Error("There was a problem adding your project.");
        }
    }
    if(_action==="addDetails"){ 
        try {
            var projectId = 0;

            await fetch("http://localhost:9000/api/projects/byId/"+values.newProjectBugs)
            .then((res) => res.json()).then((res) => projectId = res.ProjectId)
            
            if (projectId) {
                await fetch("http://localhost:9000/api/bugs", {
                    method:"POST",
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({BugDescription:values.Description, Severity:values.Severity , AssignedTo : values.assignedTo
                                            , ProjectId: projectId})
                });
    
                await fetch("http://localhost:9000/api/bugs")
                .then((res) => res.json())
                .then((res)=> details = res.map(
                    (el) => {
                        return {
                            BugId : el.BugId,
                            Description : el.BugDescription,
                            ProjectId : el.ProjectId,
                            Severity : el.Severity,
                            AssignedTo: el.AssignedTo
                        }
                    }
                ));
            }
            

            return toast.success("Bug Added");
        } catch (error) {
            throw new Error("There was a problem adding your bug.");
        }
    }
    if(_action==="deleteDetail"){ 
        try {
            //dtls
            deleteItem({
                key:"details",
                id:values.detailId
            })
            return toast.success("Details deleted!");
        } catch (error) {
            throw new Error("There was a problem deleting the details.");
        }
    }



    
}


const Dashboard =()=>{
    useLoaderData();
    return(
        <>
            {userName ? 
            (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        
                        {   
                            projects && projects.length>0 
                            ?
                            (
                            <div className="grid-lg">
                            <div className="flex-lg">
                                <AddProjectForm/>
                                {/* exista bug */}
                                <AddDetailsForm projects={projects}/>
                            </div>
                            <h2>Existing projects</h2>
                            <div className="bugs">
                                {
                                    projects.map((pj)=>(
                                        <ProjectItem key={pj.ProjectId} pj={pj}/>
                                    ))
                                }
                            </div>
                            {
                                details && details.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Recent details added to bugs</h2>
                                        <Table details={details
                                        .slice(0,8)
                                        }
                                        
                                        />
                                        {details.length>8 &&(
                                            <Link
                                            to="details"
                                            className="btn btn--dark"
                                            >
                                                View all bugs
                                            </Link>
                                        )} 
                                    </div>
                                )
                            }
                            </div>
                            )
                            :(
                                <div className="grid-sm">
                                    <p>Bugs just stay in your software until someone manually gets rid of them. That’s why bug tracking software is so critical to software development teams</p>
                                    <p>Discovered a bug? 🔍</p>
                                    <AddProjectForm/>
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro/> }
            
        </>
    )
}

export default Dashboard