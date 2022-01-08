import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function RegistrationPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    let navigate = useNavigate()
    
    const onRegisterHandler = () => {
        let body = {
            email: email,
            password: password,
            password2: password2
        }

        if (password !== password2) {
            alert("Password doesn't match")
        } else {
            axios.post("http://localhost:5000/auth/registration", body)
            .then((response) => {
                navigate.push("/login")
            })
        }
    }



    return (
    <div>
        <form>
            <input 
                name="email"
                type="email" 
                placeholder="email"
                onChange={(event) => {setEmail(event.target.value)}} />
            <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                onChange={(event) => {setPassword(event.target.value)}} />
            <input 
                name="password2" 
                type="password" 
                placeholder="Type in Password again" 
                onChange={(event) => {setPassword2(event.target.value)}} />
            
        </form>
        <button onClick={onRegisterHandler}>Sign up</button>
    </div>
  )
}

export default RegistrationPage