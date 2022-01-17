import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function CreatePostPage() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onCreateHandler = () => {
    let body = {
      title: title,
      description: description
    }

    // api 설계
    
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            onChange={(event) => {event.target.value}} 
            name="title" 
            type="text" 
            placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Room description</Form.Label>
          <Form.Control 
            onChange={(event) => {event.target.value}} 
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
