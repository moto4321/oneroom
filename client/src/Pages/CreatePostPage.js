import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import FileUpload from '../Components/utils/FileUpload';
import { AuthContext } from '../Components/utils/AuthContext'

function CreatePostPage(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const [storedTitle, setStoredTitle] = useState('')
  const [storedDesc, setStoredDesc] = useState('')

  const { authState } = useContext(AuthContext)

  let navigate = useNavigate()

  useEffect(() => {
    // if (props.editPost) {
    //   setTitle(props.storedTitle)
    //   setDescription(props.storedDesc)
    // }
    setStoredTitle(props.storedTitle)
    setStoredDesc(props.storedDesc)
    // console.log(props.editPost)
    // console.log(props.storedTitle)
    // console.log(props.storedDesc)
  }, [])

  const onCreateHandler = () => {
    let body = {
      title: title,
      description: description,
      images: images
    }

    axios.post("http://localhost:3001/post", body, {
        headers: {
          accessToken: localStorage.getItem("token")
        }
    })
    .then((response) => {
      console.log('success')
      // console.log(response.data.us) // { id: 1, iat: 숫자수자어쩌구.. }
      navigate("/")
    })
    .catch((err) => {
      console.log(err)
    })

  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '800px',
        margin: 'auto'
      }}
    >
      <FileUpload refreshFunction={updateImages} />
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            // onChange={(event) => {event.target.value}} 
            onChange={({ target: { value } }) => setTitle(value)}
            name="title" 
            defaultValue={storedTitle}
            type="text" 
            placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Room description</Form.Label>
          <Form.Control 
            // onChange={(event) => {event.target.value}} 
            onChange={({ target: { value } }) => setDescription(value)}
            name="description" 
            defaultValue={storedDesc}
            as="textarea"
            placeholder='Description about the room'
            rows={3} />
        </Form.Group>
      </Form>
      <Button onClick={onCreateHandler} variant="primary" type="submit">Create</Button>
    </div>
  )
}

export default CreatePostPage
