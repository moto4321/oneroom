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
// import { useNavigate } from 'react-router-dom'
// axios.defaults.withCredentials = true;


function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    status: false,
  })

  // let navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/auth", {
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
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/registration">Register</Nav.Link>
                </Nav>
                ) : (
                <Nav className="ml-auto">
                  <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
                  <Nav.Link href="/create-post">createPost</Nav.Link>
                </Nav>
                )}
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/post/:id" element={<PostDetail />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
            <Route exact path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
