import * as React from 'react';
import axios from 'axios';
import Header from "./Header";

//interface do state do form
interface FormState {
    email: string;
    password: string;
}

const Login = ({setState}) => {
    const [formState, setFormState] = React.useState<FormState>({
        email: '',
        password: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    /*
     funcao que e chamada quando ocorre
      um evento de alteracao num elemento HTML Input.
      Esta funcao atualiza o state de "formState" com o novo valor do campo de entrada
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /*
            Funcao que e chamada quando ocorre um evento de envio de formulario,
            comeca por declarar uma constante "handleSubmit" que e uma funcao que recebe um parametro
            chamado "event", este e um evento de envio de formulario do tipo "React.FormEvent<HTMLFormElement>"

        */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        /*
                Bloco "try-catch", tenta fazer uma solicitacao POST para a url 'http://localhost:8000/login' com os dados email e password.
                Se a solicitacao for bemsucedida e houver um token de acesso retornado, esse token e armazenado no armazenamento
                local do navegador e o estado da aplicacao e atualizado para exibir os posts
                Caso contrario a funcao "setError" e chamada pra atualizar o state do erro.
        */
        try {
            const response = await axios.post("http://localhost:8000/login", {
                email: formState.email,
                password: formState.password,
            })
            if(formState.email.length<1 || formState.password.length<1){
                throw new Error('Please fill in all fields');
            }
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
