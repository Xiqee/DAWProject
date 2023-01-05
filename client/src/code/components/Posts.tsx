import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import jwt from "jwt-decode";

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
        useEffect(() => {
            axios.get('http://localhost:8000/blogpost')
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    setPosts(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, []);
        const userToken = localStorage.getItem("user")
        const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
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
                                <Accordion.Header>{post.author}</Accordion.Header>
                                <Accordion.Body>
                                    {post.text}
                                    <p>
                                        <button onClick={() => axios.post("http://localhost:8000/blogpost/like/"+ post._id)}>
                                            <FontAwesomeIcon icon={faThumbsUp}/>
                                            <b> {post.likes}</b>
                                        </button>
                                    </p>
                                    <p>
                                        {userID == post.authorID &&
                                            <button onClick={() => setState({view: "updatePost", postID: post._id})}>
                                                Update Post
                                            </button>
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
