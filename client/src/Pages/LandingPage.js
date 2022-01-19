import axios from 'axios'
import React, { useEffect, useState } from 'react'

function LandingPage() {

  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {

  }, [])
  axios.get(`http://localhost:5000/post`, {
    headers: {
      // cookie
    }
  }).then((response) => {
    
  })

  return (
    <div>
      This is Landing Page
      
    </div>
  )
}

export default LandingPage
