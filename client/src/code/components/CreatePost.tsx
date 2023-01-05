import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import jwt from "jwt-decode";

interface PostState {
    text: string,
}

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
        const [postState, setPostState] = React.useState<PostState>({
            text: '',
        });
        const [error, setError] = React.useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setPostState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        };

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsSubmitting(true);
            setError('');

            const userToken = localStorage.getItem("user")
            const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
            const userID = user ? user._id : false;

            try {
                const response = await axios.post('http://localhost:8000/blogpost', {
                    authorID: userID,
                    text: postState.text,
                });
                setState({view: "posts"})
                // Do something with the response data
                console.log(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsSubmitting(false);
            }
        };

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
                    {posts?.map((post) => (
                        <Accordion defaultActiveKey="0" style={{width: '50%'}}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{post.author}</Accordion.Header>
                                <Accordion.Body>
                                    {post.text}
                                    <p>
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        {post.likes}
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
