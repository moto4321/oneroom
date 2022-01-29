import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

function PostCard(props) {

  let { id } = useParams()

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/post/byid/${id}`)
  //     .then((response) => {
        
  //     })
  // }, [])

  // const getDetail = (id) => {
  //   axios.get(`http://localhost:5000/post/byid/${id}`)
  //     .then((response) => {

  //     })
  // }

  return (
    <div className="py-2 mb-3">
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          {/* <div className="border-bottom border-top border-primary py-2 mb-3"> */}
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Button variant="primary">Dive in detail</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PostCard