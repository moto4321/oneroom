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
        axios.post('http://localhost:3001/auth/login', body)
        .then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {        
                localStorage.setItem("token", response.data.token)
                navigate("/")
            }
        })
    }



    return (
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
            </Form>
            <Button onClick={onSubmitHandler} variant="primary" type="submit">
                Submit
            </Button>
        </div>
  )
}

export default LoginPage