import { Form, useFetcher } from "react-router-dom";
//icons
import { BugAntIcon } from "@heroicons/react/24/solid";


import { useEffect, useRef, useState } from "react";

const AddProjectForm = () =>{
    const fetcher=useFetcher();
    const isSubmitting=fetcher.state === "submitting"

    const formRef=useRef();
    const focusRef=useRef();
    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])



    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add Project
            </h2>
            <fetcher.Form 
            method="post"
            className="grid-sm"
            ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="projectTitle">Project Title</label>
                    <input type="text" name="projectTitle" id="newProject" placeholder="e.g Timer app" required ref={focusRef}></input>
                    <label htmlFor="newRepositoryLink">Repository Link</label>
                    <input type="text" name="repositoryLink" id="newRepositoryLink" placeholder="e.g https://github.com/TimerSth" required ref={focusRef}></input>

                </div>
                
                <input type="hidden" name="_action" value="createProject"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :(
                            <>
                            <span>Create project</span>
                            <BugAntIcon width={20}/>
                            </>
                        )
                    }
                    
                </button>

            </fetcher.Form>
        </div>
    )
}

export default AddProjectForm;