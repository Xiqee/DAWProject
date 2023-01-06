import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import * as React from "react";
import jwt from 'jwt-decode'

//interface do token associado a um user
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

    /*
        funcao que remove um item com o nome "user" do armazenamento local do navegador e,
        recarrega a pagina atual usando o metodo "reload" da propriedade "location" do objeto "window".
     */
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    //variavel userToken que verifica se existe umm token associado a "user", se existir fica guardado na variavel
    const userToken = localStorage.getItem("user")
    //variavel user que decodifica o userToken usando uma funcao jwt
    const user = userToken? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
    //variavel userID que serve para armazenar o ID do user associado ao token
    const username = user? user.username : false;
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Devour Forum</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => setState({view: "posts"})}>Home</Nav.Link>

                    {user &&
                        <div style={{ display:"flex", justifyContent:"left"}}>
                            <Nav.Link onClick={() => setState({view: "home"})}>Welcome {username}</Nav.Link>
                            <Nav.Link onClick={() => setState({view: "createPost"})}>Create Post</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </div>
                    }
                    {!user &&
                        <div style={{ display:"flex", justifyContent:"left"}}>
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
