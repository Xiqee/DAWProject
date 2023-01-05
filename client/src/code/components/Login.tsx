import * as React from 'react';
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Header from "./Header";

interface FormState {
    name: string;
    email: string;
    password: string;
}

const Login = ({setState}) => {
    const [formState, setFormState] = React.useState<FormState>({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await axios.post("localhost:8000/login", {
                email: formState.email,
                password: formState.password,
            })

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setState({view:"posts"})
            }
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
            }}>Login</h1>
            <div style={{
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form onSubmit={handleSubmit} style={{width: '45%'}}>
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            id="floatingInput"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}/>
                        <label htmlFor="floatingInput">Email address</label>
                        <br/>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            id="floatingPassword"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}/>
                        <label htmlFor="floatingPassword">Password</label>
                        <br/>
                    </div>
                    {error && <div>{error}</div>}
                    <div className="d-grid d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Go
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
