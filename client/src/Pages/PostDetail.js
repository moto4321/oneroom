import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function PostDetail() {

  let { id } = useParams()
  const [title, setTitle] = useState('')  
  const [description, setDescription] = useState('')  

  useEffect(() => {
    axios.get(`http://localhost:3001/post/byid/${id}`)
      .then((response) => {
        setTitle(response.data.post.title)
        setDescription(response.data.post.description)
      })
  }, [])



  return (
    <div>
      <Card>
        <Card.Body>{title}</Card.Body>
        <Card.Body>{description}</Card.Body>
      </Card>
    </div>
  )
}

export default PostDetail;
