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
            axios.post("/auth/registration", body)
            .then((response) => {
                navigate("/login")
            })
            .catch(() => {
                console.log('er')
            })
        }
    }



    return (
    // <div>
    //     <form>
    //         <input 
    //             name="email"
    //             type="email" 
    //             placeholder="email"
    //             onChange={(event) => {setEmail(event.target.value)}} />
    //         <input 
    //             name="password" 
    //             type="password" 
    //             placeholder="Password" 
    //             onChange={(event) => {setPassword(event.target.value)}} />
    //         <input 
    //             name="password2" 
    //             type="password" 
    //             placeholder="Type in Password again" 
    //             onChange={(event) => {setPassword2(event.target.value)}} />
            
    //     </form>
    //     <button onClick={onRegisterHandler}>Sign up</button>
    // </div>
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '300px', 
        alignItems: 'center',
        margin: 'auto',
        marginTop: '20vh'
         }}
    >
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    onChange={(event) => {setEmail(event.target.value)}} 
                    type="email" 
                    placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    type="password" 
                    placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password Check</Form.Label>
                <Form.Control 
                    onChange={(event) => {setPassword2(event.target.value)}} 
                    type="password" 
                    placeholder="Password Check" />
            </Form.Group>
        </Form>
        <Button onClick={onRegisterHandler} variant="primary" type="submit">
            Sign Up
        </Button>
    </div>
  )
}

export default RegistrationPage