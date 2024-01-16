import { Form, NavLink } from 'react-router-dom'
import bug from '../assets/bug.svg'

//icons
import { TrashIcon } from '@heroicons/react/24/solid'

const Nav =({userName})=>{
    
    return(
        <nav>
            {/* <img src={bug} alt="" height={30}/> */}
            <NavLink 
            to="/"
            aria-label="Go to main page"
            >
                <img src={bug} alt="" height={30}/>
                <span>Bug Tracker</span>
            </NavLink>
            {
                userName && (
                    <Form
                    method="post"
                    action="logout"
                    onSubmit={(event)=>{
                        if(!confirm("Delete user and all data?")){
                            event.preventDefault();
                        }
                    }}
                    >
                        <button type="submit" className="btn btn-warning">
                            <span>Delete  User</span>
                            <TrashIcon width={20} color='#ffffff'/>
                        </button>

                    </Form>
                )
            }
        </nav>
    )
}

export default Nav