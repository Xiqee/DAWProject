
// React imports.
import React, {useState} from "react";
import ReactDOM from "react-dom";

// App imports.
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";

function App() {
    const [state, setState] = useState({view: "home", postID: ""});
    if (state.view == "home") return <Posts setState={setState}/>
    else if (state.view == "register") return <Register setState={setState}/>
    else if (state.view == "login") return <Login setState={setState}/>
    else if (state.view == "posts") return <Posts setState={setState}/>
    else if (state.view == "createPost") return <CreatePost setState={setState}/>
    else if (state.view == "updatePost") {return <UpdatePost postID={state.postID} setState={setState}/>}
}

// Render the UI.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
