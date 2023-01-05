import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import * as React from "react";

const Header = ({setState}) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={ () => setState({view: "home"})}>Devour Forum</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={ () => setState({view: "posts"})}>Home</Nav.Link>
                    <Nav.Link onClick={ () => setState({view: "register"})}>Register</Nav.Link>
                    <Nav.Link onClick={ () => setState({view: "login"})}>Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        );
};


export default Header;
