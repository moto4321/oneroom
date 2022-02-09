import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function PostDetail() {

  let { id } = useParams()
  const [title, setTitle] = useState('')  
  const [description, setDescription] = useState('')  
  const [images, setImages] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3001/post/byid/${id}`)
      .then((response) => {
        setImages(response.data.images)
        setTitle(response.data.post.title)
        setDescription(response.data.post.description)
      })
  }, [])



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
        <Card.Body>{title}</Card.Body>
        <Card.Body>{description}</Card.Body>
      </Card>
    </div>
  )
}

export default PostDetail;
