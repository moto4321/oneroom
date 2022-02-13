import React, { useEffect } from 'react'
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import CreatePostPage from './Pages/CreatePostPage';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue, useSetRecoilState, useResetRecoilState 
} from 'recoil';
import { authState } from './state';
import PostDetail from './Pages/PostDetail';
// axios.defaults.withCredentials = true;


function App() {
  const [login, setLogin] = useRecoilState(authState)
  const auth = useRecoilValue(authState)
  
  const onLogoutHandler = () => {
    localStorage.removeItem("token")
    setLogin(false)
    // state 변경 recoil
  }

  useEffect(() => {
    
  })


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {/* {
              auth === false ? ( 
                <Nav className="ml-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/registration">Register</Nav.Link>
                </Nav>
              ) : (
                <Nav className="ml-auto">
                  <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
                  <Nav.Link href="/create-post">createPost</Nav.Link>
                </Nav>
              )
            } */}
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registration">Register</Nav.Link>
              <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
              <Nav.Link href="/create-post">createPost</Nav.Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/post/:id" element={<PostDetail />} />
          <Route exact path="/registration" element={<RegistrationPage />} />
          <Route exact path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
