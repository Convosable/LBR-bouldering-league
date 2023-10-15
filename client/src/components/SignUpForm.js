import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user';

const SignUpForm = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [email, setEmail] = useState("")
    const [handicap, setHandicap] = useState("")
    const [errors, setErrors] = useState("")

    const dispatch = useDispatch();


    function handleSignup(e) {
        e.preventDefault()
            fetch('/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    handicap: handicap,
                })
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => dispatch(setUser(user)))
                }
                else {
                    r.json().then((errors) => setErrors(errors.errors))
                }
            })
    }

    return (
        <div>
            <h1>Signup:</h1>

            <form onSubmit = {handleSignup}>
                <label>First Name: </label>
                <input 
                    type = "text"
                    name = "firstname"
                    value = {firstName}
                    onChange = {(e) => setFirstName(e.target.value)} 
                /> <br></br>

                <label>Last Name: </label>
                <input 
                    type = "text"
                    name = "lastname"
                    value = {lastName}
                    onChange = {(e) => setLastName(e.target.value)} 
                /> <br></br>  
                      
                <label>Username: </label>
                <input 
                    type = "text" 
                    name = "username" 
                    value = {username} 
                    onChange = {(e) => setUsername(e.target.value)} 
                /> <br></br>

                <label>Password: </label>
                <input 
                    type = "password"
                    name = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)} 
                /> <br></br>

                <label>Password Confirmation: </label>
                <input 
                    type = "password"
                    name = "passwordConfirmation"
                    value = {passwordConfirmation}
                    onChange = {(e) => setPasswordConfirmation(e.target.value)} 
                /> <br></br>


                <label>Email: </label>
                <input 
                    type = "text"
                    name = "email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)} 
                /> <br></br>

                <label>Handicap: </label>
                <select value = {handicap} onChange = {(e) => setHandicap(e.target.value)}>
                    {Array.from({ length: 11 }, (i, index) => (
                        <option key={index} value={index}>
                            V{index}
                        </option>
                    ))}
                </select> <br></br>
                <input type="submit" value="Sign Up" />
            </form>
            {errors.length > 0 ? (
                <div>
                    {errors.map((error) => (
                        <li key={error}>
                            {error}
                        </li>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default SignUpForm;