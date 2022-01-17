import React from 'react'
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
import axios from 'axios';

function App() {
  const [loginState, setLoginState] = useRecoilState(authState)


  const onLogoutHandler = () => {
    axios.get("http://localhost:5000/auth/logout")
    .then(response => {
      console.log(response.data.hello)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
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
          <Route exact path="/registration" element={<RegistrationPage />} />
          <Route exact path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
