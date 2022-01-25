import axios from 'axios'
import React, { useEffect, useState } from 'react'

function LandingPage() {

  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/post`)
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
            <div>{post.title}</div>
            <div>{post.description}</div>
          </div>
        )
      })}
      
    </div>
  )
}

export default LandingPage
