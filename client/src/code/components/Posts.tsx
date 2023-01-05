import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

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
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <b> {post.likes}</b>
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
