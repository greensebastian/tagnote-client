import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { Routes } from "../routes/appRouter";

const Navigation = () => {
  const location = useLocation();
  return (
    <Navbar bg="dark" variant="dark" className="mb-2">
      <Container>
        <LinkContainer to={Routes.Home}>
          <Navbar.Brand>Tag Note</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={location.pathname} className="mr-auto">
            <LinkContainer exact to={Routes.Home}>
              <NavLink>Home</NavLink>
            </LinkContainer>
            <LinkContainer to={Routes.Sync}>
              <NavLink>Sync</NavLink>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
