import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <BootstrapNavbar bg="dark" data-bs-theme="dark">
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/">Blog</BootstrapNavbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to='/add/'>Add Post</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link>{user.username}</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/'>Login</Nav.Link>
                <Nav.Link as={Link} to='register/'>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
