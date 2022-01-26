import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'

function PostCard(props) {

  const onDetail = () => {
    console.log('d')
  }

  return (
    <div className="py-2 mb-3">
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          {/* <div className="border-bottom border-top border-primary py-2 mb-3"> */}
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Button variant="primary" onClick={onDetail}>Dive in detail</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PostCard