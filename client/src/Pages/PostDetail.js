import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function PostDetail() {

  let { id } = useParams()
  const [title, setTitle] = useState('')  
  const [description, setDescription] = useState('')  
  const [images, setImages] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3001/post/byid/${id}`)
      .then((response) => {
        setImages(response.data.images)
        setTitle(response.data.post.title)
        setDescription(response.data.post.description)
      })
  }, [])

  const createCommentHandler = () => {
    let body = {
      comment: comment
    }

    axios.post("http://localhost:3001/comment", body, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response) => {
      console.log(response.data)
    })
  }


  return (
    <div>
      <Card>
        <div>
          {images.map((image, index) => {
            return(
              <img style={{ maxWidth: '300px' }} src={"http://localhost:3001/" + image.image}/>
            )
          })}
        </div>
        <Card.Body>Title : {title}</Card.Body>
        <Card.Body>Description : {description}</Card.Body>
      </Card>
      <br />
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Comments..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(event) => { setComment(event.target.value) }}
        />
        <Button 
          variant="outline-secondary" 
          id="button-addon2"
          onClick={createCommentHandler}
        >  
          Comment
        </Button>
      </InputGroup>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default PostDetail;
