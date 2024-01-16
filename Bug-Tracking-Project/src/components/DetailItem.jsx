import { Link, useFetcher } from "react-router-dom";
import { formatDateToString, getAllMatchingItems } from "../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const DetailItem=({detail})=>{
    const fetcher=useFetcher();
    const [project, setProject] = useState({});

    useEffect(() => {
        fetch("http://localhost:9000/api/projects/byId/"+detail.ProjectId)
        .then((res) => res.json()).then((res) => {
            setProject(res);
        })
    }, [])

        return (
        <>
            <td>{detail.BugDescription}</td>
            <td>{detail.Severity}</td>
            <td>{detail.AssignedTo}</td>
            
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteDetail"/>
                    <input type="hidden" name="detailId" value={detail.BugId}/>
                    <button type="submit" className="btn btn--warning" aria-label={`Delete details from ${project.Name}`}>
                    <TrashIcon width={20}></TrashIcon>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default DetailItem;