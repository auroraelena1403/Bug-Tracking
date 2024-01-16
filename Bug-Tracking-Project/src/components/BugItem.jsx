import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Form, Link } from "react-router-dom";

const ProjectItem = ({pj, showDelete=false})=>{
    const {ProjectId,ProjectName,RepositoryLink, color} = pj;
    return (
        <div className="bug" style={{"--accent":color}}>
            <div className="progress-text">
                <h3>{ProjectName}</h3>
                <h3>{RepositoryLink}</h3>
              
                
            </div>
            {
                showDelete ? (
                    <div className="flex-sm">
                    <Form method="post" action="delete" onSubmit={(event)=>{
                        if(!confirm("Are you sure you want to delete this bug?")){
                            event.preventDefault();
                        }
                    }}>
                        <button type="submit" className="btn">
                            <span>Delete Project</span>
                            <TrashIcon width={20}></TrashIcon>
                        </button>
                        
                    </Form>
                    </div>
                ) 
                : (
                    <div className="flex-sm">
                    <Link
                    to={`/project/${ProjectId}`}
                    className="btn"
                    >
                    <span>View Bugs</span>
                    <EyeIcon width={20}></EyeIcon>
                    </Link>
                    </div>
                )
            }
        </div>
    )
}

export default ProjectItem;