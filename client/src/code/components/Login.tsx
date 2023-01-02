import * as React from 'react';
import axios from 'axios';

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
            const response = await axios.post('http://localhost:8080/login', {
                email: formState.email,
                password: formState.password,
            });

            if(response.data.message == 'ok') {
                setState.user = response.data.user;
                setState.currentView = 'register';
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            {error && <div>{error}</div>}
            <button type="submit" disabled={isSubmitting}>
                Login
            </button>
        </form>
    );
};

export default Login;
