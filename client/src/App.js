import React from 'react'
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
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
      console.log(response.data.ddd)
    })
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registration">Register</Nav.Link>
              <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/registration" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
