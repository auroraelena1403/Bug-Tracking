import { useLoaderData } from "react-router-dom";
import { addDetails, deleteItem, generateRandomColor, getAllMatchingItems } from "../helpers";
import ProjectItem from "../components/BugItem";
import AddDetailsForm from "../components/AddDetailsForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

let project = undefined;
let details = [];

export async function projectPageLoader({params}){
  try {
    await fetch("http://localhost:9000/api/projects/byId/"+params.id)
    .then((res) => res.json()).then((res) => {
      project = {
        ProjectId: res.ProjectId,
        ProjectName : res.Name,
        RepositoryLink : res.RepositoryLink,
        color : generateRandomColor
      }; 
    });
  } catch(err) {
    console.log(err);
    project = undefined; 
  }
  

  if(!project){
    throw new Error("The project you are trying to find doesn`t exist");
  } else {
    await fetch("http://localhost:9000/api/bugs/"+project.ProjectId)
    .then((res) => res.json()).then((res) => details = res);
  }

  return {project, details};
}

export async function projectAction({request}){
  const data=await request.formData();
  
  const {_action, ...values}=Object.fromEntries(data);
  if(_action==="addDetails"){ 
    try {

        if(project){
          await fetch("http://localhost:9000/api/bugs", {
            method:"POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({BugDescription:values.Description, Severity:values.Severity , AssignedTo : values.assignedTo
                                    , ProjectId: project.ProjectId})
        });
        }
        

        return toast.success("Bug Added");
    } catch (error) {
        throw new Error("There was a problem adding your bug.");
    }
}
  if(_action==="deleteDetail"){ 
      try {
          await fetch("http://localhost:9000/api/bugs/"+values.detailId, {
                method:"DELETE"
            });
          return toast.success("Bug deleted!");
      } catch (error) {
          throw new Error("There was a problem deleting the bug.");
      }
  }
}
const ProjectPage=()=>{
    useLoaderData();
    return(
        <div className="grid-lg" 
        style={{
          "--accent":project.color
        }}
        >
          <h1 className="h2">
            <span className="accent">{project.ProjectName} </span>
             Overview
          </h1>
          <div className="flex-lg">
            <ProjectItem pj={project} showDelete={true}/>
            <AddDetailsForm projects={[project]}/>
          </div>
          {details && details.length > 0 && (
              <div className="grid-md">
                <h2>
                  <span className="accent">{project.ProjectName} </span>
                  Details
                </h2>
                <Table details={details} showProject={true}/>
              </div>
            )}
        </div>
    ) 
}

export default ProjectPage;