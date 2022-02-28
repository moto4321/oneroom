import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from 'react-router-dom'
import FileUpload from '../Components/utils/FileUpload';
import { AuthContext } from '../Components/utils/AuthContext'

function CreatePostPage(props) {

  let { id } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])


  const [storedTitle, setStoredTitle] = useState('')
  const [storedDesc, setStoredDesc] = useState('')
  const [storedImages, setStoredImages] = useState([])

  const { authState } = useContext(AuthContext)

  let navigate = useNavigate()

  useEffect(() => {
    setStoredTitle(props.storedTitle)
    setStoredDesc(props.storedDesc)
    setStoredImages(props.storedImages) // ㅇㅇ
    // console.log(storedImages)// []
  }, [])

  const onCreateHandler = () => {

    let body = {
      images: images,
      title: title,
      description: description
    }
    
    if (props.editPost) {

      let body = {
        images: storedImages,
        title: title,
        description: description
      }
      
      axios.put(`http://localhost:3001/post/edit/${id}`, body, {
        headers: {
          accessToken: localStorage.getItem("token")
        }
      })
      .then((response) => {
        // navigate(`/post/${response.data.postId}`)
        navigate("/")
      })


    } else {

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
      // console.log(images)
    }
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
      <FileUpload 
        refreshFunction={updateImages}
        storedImages={storedImages}
        editPost={props.editPost}
      />
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
