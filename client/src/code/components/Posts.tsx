import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import jwt from "jwt-decode";

//interface do token associado a um user
interface MyToken {
    createdAt: string,
    email: string,
    exp: number,
    iat: number,
    password: string,
    updatedAt: string,
    username: string,
    __v: number,
    _id: string,

}

const Posts = ({setState}) => {
        const [posts, setPosts] = useState([]);
        /*
            Hook "useEffect" e chamado com uma funca de efeito e um array dependencias.
         */
        useEffect(() => {
            axios.get('http://localhost:8000/blogpost')
                .then((res) => res.data)
                .then((data) => {
                    setPosts(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, []);

        //variavel userToken que verifica se existe umm token associado a "user", se existir fica guardado na variavel
        const userToken = localStorage.getItem("user")
        //variavel user que decodifica o userToken usando uma funcao jwt
        const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
        //variavel userID que serve para armazenar o ID do user associado ao token
        const userID = user ? user._id : false;

        return (
            <div>
                <Header setState={setState}/>
                <h1 className="display-6" style={{
                    paddingTop: '40px',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>Posts</h1>
                <div style={{
                    paddingTop: '15px',
                    height: '100%',
                    width: '850px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',

                }}>
                    {posts?.map((post) => (
                        <Accordion defaultActiveKey="0" style={{width: '100%', paddingTop: "10px"}}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <img src={require("/public/images/"+post.authorImage)} alt={" "} style={{borderRadius: "50%"}} />
                                    <b style={{paddingLeft: "10px"}}>{post.author}</b>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p>{post.text}</p>
                                    <p>Created at: {post.createdAt.split('T')[0]}  {post.createdAt.split('T')[1].slice(0, -2)}<br />
                                        Updated at: {post.updatedAt.split('T')[0]}  {post.updatedAt.split('T')[1].slice(0, -2)}</p>
                                    <p>
                                        {userID == post.authorID &&
                                            <Button variant="outline-primary" onClick={() => setState({view: "updatePost", postID: post._id})}>
                                                Update Post
                                            </Button>
                                        }
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>
            </div>
        );
    }
;
export default Posts;
