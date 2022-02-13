import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function PostDetail() {

  let { id } = useParams()
  const [title, setTitle] = useState('')  
  const [description, setDescription] = useState('')  
  const [images, setImages] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3001/post/byid/${id}`)
      .then((response) => {
        setImages(response.data.images)
        setTitle(response.data.post.title)
        setDescription(response.data.post.description)
        setComments(response.data.comments)
      })
  }, [newComment])

  const createCommentHandler = () => {
    axios.post("http://localhost:3001/comment",
    {
      newComment: newComment,
      PostId: id
    }, 
    {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response) => {
      if (response.data === 'success') {
        setComments([...comments, newComment])
        setNewComment("")
      }
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
          value={newComment}
          onChange={(event) => { setNewComment(event.target.value) }}
        />
        <Button 
          variant="outline-secondary" 
          id="button-addon2"
          onClick={createCommentHandler}
        >  
          Comment
        </Button>
      </InputGroup>
      <hr />
      {/* <ListGroup variant="flush"> */}
        {comments.map((comment, index) => {
          return (<div>{comment.comment}</div>)
        })}
      {/* </ListGroup> */}
    </div>
  )
}

export default PostDetail;
