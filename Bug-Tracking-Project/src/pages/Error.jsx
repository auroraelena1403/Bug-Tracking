import { Link, useNavigate, useRouteError } from "react-router-dom";

//icons
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error=()=>{
    const error=useRouteError();
    //history pt go back
    const navigate=useNavigate();
    
return (
    <div className="error">
        <h1>Oops!</h1>
        <p>{error.message || error.statusText}</p>
        <div className="flex-md">
            <button className="btn btn--dark" onClick={()=>navigate(-1)}>
                <ArrowUturnLeftIcon width={20}/>
                <span>Go back</span>
            </button>

            <Link
            to="/"
            className="btn btn--dark"
            >
            <HomeIcon width={30}/>
            <span>Go to the main page</span>
            </Link>
        </div>
        
    </div>
)
}
export default Error;