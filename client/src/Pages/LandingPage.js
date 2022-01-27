import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

  const [listOfPosts, setListOfPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/post`)
      .then((response) => {
        setListOfPosts(response.data.listOfPosts)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const onPostDetail = () => {

    // axios.get(`http://localhost:5000/post/${id}`)
    //   .then(() => {

    //   })
    //   .catch(() => {

    //   })
  }

  return (
    <div>
      {listOfPosts.map((post, key) => {
        return(
          <div onClick={() => { navigate(`/post/${post.id}`) }}>
            {/* <div>{post.title}</div>
            <div>{post.description}</div> */}
            <PostCard 
              title={post.title}
              description={post.description} 
            />
          </div>
        )
      })}
    </div>
  )
}

export default LandingPage
