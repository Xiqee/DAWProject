import * as React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";

interface PostState {
    blogpost: [];
}

const Posts = async ({setState}) => {
    const [formState, setFormState] = React.useState<PostState>({
        blogpost: []
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    setState.blogpost = await axios.get('http://localhost:8080/blogpost');

    setState.blogpost.forEach((product) => {
        setS.push(<li>{product}</li>)
    })

    return (
        <div>
            <Header setState={setState}/>
            <h1 className="display-6" style={{
                paddingTop: '40px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>Register</h1>
            <div style={{
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                    <tbody>
                    {setState.blogpost.map(item => <ObjectRow key={item.id} name={item.name} />)}
                    </tbody>
            </div>
        </div>
    );
};

export default Posts;
