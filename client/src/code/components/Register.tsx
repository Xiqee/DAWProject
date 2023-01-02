import * as React from 'react';
import axios from 'axios';

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
        const { name, value } = event.target;
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
            if (formState.password !== formState.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await axios.post('http://localhost:8080/register', {
                username: formState.name,
                email: formState.email,
                password: formState.password,
            });

            setState({view: "login"})
            // Do something with the response data
            console.log(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
            />
            <br />
            {error && <div>{error}</div>}
            <button type="submit" disabled={isSubmitting}>
                Register
            </button>
        </form>
    );
};

export default Register;
