import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'

// const cookies = new Cookies()

function CreatePostPage() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [cookies, setCookie] = useCookies('');

  let navigate = useNavigate()

  const onCreateHandler = () => {
    let body = {
      title: title,
      description: description
    }

    axios.post("http://localhost:5000/post", body, {
        headers: {
          token: localStorage.getItem("token")
        }
    })
    .then((response) => {
      console.log('success')
      navigate("/")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            // onChange={(event) => {event.target.value}} 
            onChange={({ target: { value } }) => setTitle(value)}
            name="title" 
            type="text" 
            placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Room description</Form.Label>
          <Form.Control 
            // onChange={(event) => {event.target.value}} 
            onChange={({ target: { value } }) => setDescription(value)}
            name="description" 
            as="textarea" 
            rows={3} />
        </Form.Group>
      </Form>
      <Button onClick={onCreateHandler} variant="primary" type="submit">Create</Button>
    </div>
  )
}

export default CreatePostPage
