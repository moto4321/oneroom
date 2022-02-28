import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Components/utils/AuthContext'
import CreatePostPage from '../Pages/CreatePostPage';

function PostDetail() {

  let { id } = useParams()
  const [title, setTitle] = useState('')  
  const [description, setDescription] = useState('')  
  const [images, setImages] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [post, setPost] = useState({})


  const [editPost, setEditPost] = useState(false)
  const [storedTitle, setStoredTitle] = useState('')
  const [storedDesc, setStoredDesc] = useState('')
  const [storedImages, setStoredImages] = useState([])


  const { authState } = useContext(AuthContext)

  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/post/byid/${id}`)
      .then((response) => {
        setImages(response.data.images)
        setTitle(response.data.post.title)
        setDescription(response.data.post.description)
        setComments(response.data.comments)
        setPost(response.data.post)
      })

    // axios.get(`http://localhost:3001/auth`, {
    //   headers: {
    //     accessToken: localStorage.getItem('token')
    //   }
    // })
    // .then((response) => {
    //   // console.log(response.data) //{ id: 2, iat: 124135315 }
      
    // })
  }, [newComment])

  const createCommentHandler = () => {
    axios.post("http://localhost:3001/comment",
    {
      newComment: newComment,
      PostId: id
    }, 
    {
      headers: {
        accessToken: localStorage.getItem("token")
      }
    })
    .then((response) => {
      if (response.data === 'success') {
        setComments([...comments, newComment])
        setNewComment("")
      }
    })
  }

  const deletePost = () => {
    axios.delete(`http://localhost:3001/post/${id}`)
    .then((response) => {
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        navigate("/")
      }
    })
  }

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comment/${id}`)
    .then((response) => {
      setComments(
        comments.filter((value) => {
          return value.id != id
        })
      )
    })
  }

  const editPostHandler = () => {
    axios.get(`http://localhost:3001/post/edit/${id}`)
    .then((response) => {
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        setStoredTitle(response.data.post.title)
        setStoredDesc(response.data.post.description)
        // setStoredImages(response.data.images)
        // console.log(response.data.images)
        setStoredImages(response.data.imageUrl)
        // console.log(response.data.imageUrl)
        setEditPost(true)
      }
    })
  }


  return (
    <div>
      {editPost ? (
        <CreatePostPage 
          editPost={editPost}
          storedTitle={storedTitle} 
          storedDesc={storedDesc}
          storedImages={storedImages}
        />
      ) : ( 
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
          {authState.id === post.UserId ? (
            <div>
              <Button onClick={editPostHandler} variant='success'>Edit Post</Button>
              <Button onClick={deletePost} variant='danger'>Delete Post</Button>
            </div>
          ) : null}
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
            return (
              <div>
                {comment.comment}
                {/* {console.log(comment)} */}
                {comment.UserId === authState.id ? (
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => {deleteComment(comment.id)}}
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            )
          })}
        {/* </ListGroup> */}
      </div>
    )}
    </div>
  )
}

export default PostDetail;
