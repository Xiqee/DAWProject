import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import * as React from "react";
import jwt from 'jwt-decode'

interface MyToken {
    createdAt : string,
    email: string,
    exp: number,
    iat: number,
    password: string,
    updatedAt : string,
    username: string,
    __v : number,
    _id: string,

}


const Header = ({setState}) => {

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    const userToken = localStorage.getItem("user")
    const user = userToken? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
    const username = user? user.username : false;
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Devour Forum</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => setState({view: "posts"})}>Home</Nav.Link>

                    {user &&
                        <div>
                            <Nav.Link onClick={() => setState({view: "home"})}>Welcome {username}</Nav.Link>
                            <Nav.Link onClick={() => setState({view: "createPost"})}>Create Post</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </div>
                    }
                    {!user &&
                        <div>
                            <Nav.Link onClick={() => setState({view: "register"})}>Register</Nav.Link>
                            <Nav.Link onClick={() => setState({view: "login"})}>Login</Nav.Link>
                        </div>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};


export default Header;
