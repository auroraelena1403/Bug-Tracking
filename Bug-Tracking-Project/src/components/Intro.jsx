import { Form } from "react-router-dom"
import { useState } from "react"


//icons si illustration
import { UserPlusIcon } from "@heroicons/react/24/solid"
import illustration from "../assets/bug-reporting.jpg"

const Intro =()=>{

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

    return(
        <div className="intro">
            <div>
                <h1>
                    Track your<span className="accent"> bugs!</span>
                </h1>
                <p>Let`s squash some bugs!👾</p>
                <Form method="post">
                    <input type="text" name="userName" required placeholder="Write your name!" aria-label="Your Name" autoComplete="given-name" />
                    <input type="text" name="email" required placeholder="Write your email!" aria-label="Your email" autoComplete="email"/>
                    <input type="password" name="password" required placeholder="Write your password!" aria-label="Your password"/>
                    <input type="hidden" name="_action" value="newUser"/>
                    <select id="myComboBox" name="userType" value={selectedValue} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="Membru proiect">Membru proiect</option>
                    <option value="Tester">Tester</option>
                    </select>
                    <button type="submit" className="btn btn--dark">
                        <span>Create account</span>
                        <UserPlusIcon width={20}/>
                    </button>
                </Form>
            </div> 
            <img src={illustration} alt="" width={600}/>
        </div>
    )
}

export default Intro