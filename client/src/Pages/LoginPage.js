import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function LoginPage() {

    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = () => {
        let body = {
            email: email,
            password: password
        }
        // console.log(body)
        axios.post('http://localhost:5000/auth/login', body, {
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            withCredentials: true
        })
        .then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {        
                navigate("/")
            }
        })
    }



    return (
        <div>
            <Form >
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
            </Form>
            <Button onClick={onSubmitHandler} variant="primary" type="submit">
                Submit
            </Button>
        </div>
  )
}

export default LoginPage