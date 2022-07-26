/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Form, Button,
} from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Football Roster</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>HOME</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>PLAYERS</Nav.Link>
            </Link>
            <Link passHref href="/teamRoster">
              <Nav.Link>TEAMS</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>PROFILE</Nav.Link>
            </Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
