import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import PostCard from './PostCard'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AuthContext } from '../Components/utils/AuthContext'

function LandingPage() {

  const [listOfPosts, setListOfPosts] = useState([])
  const { authState } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`/post`)
      .then((response) => {
        setListOfPosts(response.data.listOfPosts)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {listOfPosts.map((post, key) => {
        return(
          <div>
            <div onClick={() => { navigate(`/posts/${post.id}`) }}>
              <PostCard 
                title={post.title}
                description={post.description} 
              />
            </div>
            {/* <Button onClick={postDeleteHandler} variant='danger'>Delete</Button> */}
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default LandingPage
