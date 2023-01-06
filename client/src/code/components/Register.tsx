import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";

interface FormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = ({setState}) => {
    const [formState, setFormState] = React.useState<FormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(formState.name.length<1 || formState.email.length<1 || formState.password.length<1 || formState.confirmPassword.length <1){
                throw new Error('Please fill in all fields');
            }
            if (!formState.email.match(validRegex) ) {
                throw new Error('Email wrong format');
            }
            if (formState.password !== formState.confirmPassword) {
                throw new Error('Passwords do not match');
            }


            const response = await axios.post('http://localhost:8000/register', {
                username: formState.name,
                email: formState.email,
                password: formState.password,
            });

            if (response.data != "ok") {
                throw new Error("User with same email already exits.");
            } else setState({view: "login"})
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
            }}>Register</h1>
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
                            placeholder="Name"
                            type="text"
                            id="floatingName"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}/>
                        <label htmlFor="floatingName">Name</label>
                        <br/>
                    </div>
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
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="ConfirmPassword"
                            type="password"
                            id="floatingConfirmPassword"
                            name="confirmPassword"
                            value={formState.confirmPassword}
                            onChange={handleChange}/>
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
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

export default Register;
