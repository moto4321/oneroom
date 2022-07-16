import React, { useEffect, useState } from 'react'
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import CreatePostPage from './Pages/CreatePostPage';
import { AuthContext } from './Components/utils/AuthContext'
import PostDetail from './Pages/PostDetail';
import axios from 'axios';
import ChatComponent from './Components/utils/ChatComponent';
import ZigbangLoginPage from './Pages/ZigbangLogin';
import DabangLoginPage from './Pages/DabangLogin';
// import { useNavigate } from 'react-router-dom'


function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    status: false,
  })

  const [chatOpen, setChatOpen] = useState(false)

  // let navigate = useNavigate()

  useEffect(() => {
    axios.get("/auth", {
      headers: {
        accessToken: localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.error) {
        setAuthState({
          ...authState, status: false
        })
        console.log('error')
      } else {
        setAuthState({
          id: response.data.id,
          status: true
        })
      }
    })
  }, [])
  
  const onLogoutHandler = () => {
    localStorage.removeItem("token")
    setAuthState({ id: 0, status: false })
    // navigate("/")
  }

  const openChatting = () => {
    if (chatOpen) {
      setChatOpen(false)
    } else {
      setChatOpen(true)
    }
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Nav>
                {!authState.status ? (
                <Nav className="ml-auto">
                  <img src='img/kakao_login_medium_narrow.png' />
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/registration">Register</Nav.Link>
                </Nav>
                ) : (
                <Nav className="ml-auto">
                  <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
                  <Nav.Link href="/create-post">CreatePost</Nav.Link>
                  <Nav.Link href="/zigbang-login">직방 연결하기</Nav.Link>
                  <Nav.Link href="/dabang-login">다방 연결하기</Nav.Link>
                </Nav>
                )}
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/zigbang-login" element={<ZigbangLoginPage />} />
            <Route exact path="/dabang-login" element={<DabangLoginPage />} />
            <Route exact path="/posts/:id" element={<PostDetail />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
            <Route exact path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </Router>
        <div style={{ position: 'relative' }}>
          <img 
            onClick={openChatting}
            src='img/dialog-box-chat-icon.png' 
            style={{ position:'absolute', bottom:'0', right:'0', width: '50px' }}
          />
          {
            chatOpen ? (
              <ChatComponent />
            ) : (
              null
            )
          }
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
