import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import {useEffect} from "react";
import jwt from "jwt-decode";

//interface do state do post
interface PostState {
    text: string,
}
//interface do token associado a um user
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

const UpdatePost = (props) => {
        const [postState, setPostState] = React.useState<PostState>({
            text: '',
        });
        const [error, setError] = React.useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        useEffect(() => {
            axios.get('http://localhost:8000/blogpost/'+props.postID)
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    setPostState(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, []);
        /*
             funcao que e chamada quando ocorre
              um evento de alteracao num elemento HTML Input.
              Esta funcao atualiza o state de "formState" com o novo valor do campo de entrada
         */
        const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const {name, value} = event.target;
            setPostState((prevState) => ({
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

            //variavel userToken que verifica se existe umm token associado a "user", se existir fica guardado na variavel
            const userToken = localStorage.getItem("user")
            //variavel user que decodifica o userToken usando uma funcao jwt
            const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
            //variavel userID que serve para armazenar o ID do user associado ao token
            const userID = user ? user._id : false;

            /*
                Bloco "try-catch", tenta fazer uma solicitacao POST para a url 'http://localhost:8000/blogpost' com os dados authorID e text.
                Se a solicitacao for bem sucedida, a funcao "setState" e chamada para atualizar o state (mudando a pagina para "posts").
                Caso contrario a funcao "setError" e chamada pra atualizar o state do erro.
        */
            try {
                const response = await axios.post('http://localhost:8000/blogpost/'+props.postID, {
                    authorID: userID,
                    text: postState.text,
                });
                props.setState({view: "posts"})
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
                <Header setState={props.setState}/>
                <h1 className="display-6" style={{
                    paddingTop: '40px',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>Write your post!</h1>
                <div style={{
                    paddingTop: '15px',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <form onSubmit={handleSubmit} style={{width: '45%'}}>
                        <div style={{textAlign: "center"}}>
                        <textarea
                            rows={5}
                            cols={60}
                            name="text"
                            value={postState.text}
                            onChange={handleChange}>
                        </textarea>
                        </div>
                        {error && <div>{error}</div>}
                        <div className="d-grid d-md-flex justify-content-md-center">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;
export default UpdatePost;