import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

//icons
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddDetailsForm = ({projects})=>{
    const fetcher=useFetcher();
    const formRef=useRef();
    const focusRef=useRef();
    const isSubmitting=fetcher.state ==="submitting"
    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">Add new bugs to  <span className="accent">
                {projects.length ===1 && `${projects.map((pj)=>pj.ProjectName)}`}
                </span>
            </h2>
            
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="details-inputs">
                    <div className="grid-xs">
                        <label htmlFor="Description">Description</label>
                        <input required type="text" name="Description" id="Description" placeholder="e.g app crashed 10s after starting." ref={focusRef}/>

                    </div>
                    <div className="grid-xs">
                        <label htmlFor="Severity">Severity</label>
                        <input required type="text" name="Severity" id="Severity" placeholder="e.g Low -> Medium -> High" />

                    </div>
                    <div className="grid-xs">
                        <label htmlFor="assignedTo">Assign Bug</label>
                        <input required type="text" name="assignedTo" id="assignedTo" placeholder="e.g Chris Locke" />

                    </div>
                </div>
                
                <div className="grid-xs" hidden={projects.length===1}>
                    <label htmlFor="newProjectBugs">Choose Project</label>
                    <select name="newProjectBugs" id="newProjectBugs" required>
                        {
                            projects
                                .map((project)=>{
                                    return (
                                        <option key={project.ProjectId} value={project.ProjectId}>
                                            
                                            {project.ProjectName}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="addDetails"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :(
                            <>
                            <span>Add bug</span>
                            <PlusCircleIcon width={20}/>
                            </>
                        )
                    }
                    
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddDetailsForm;