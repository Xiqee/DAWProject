import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import {useEffect, useState} from "react";


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
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div>
                        {posts?.map((post) => (
                            <div>
                                <h3>{post.text}</h3>
                                <h3>{post.likes}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
;
export default Posts;
