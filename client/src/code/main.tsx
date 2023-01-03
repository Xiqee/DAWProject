// Style imports.
import "../css/main.css";
//
// React imports.
import React, {useState} from "react";
import ReactDOM from "react-dom";

// App imports.
import Register from "./components/Register";
import Login from "./components/Login";
import WelcomeView from "./components/WelcomeView";

function App(){
    const [state, setState] = useState({view: "home"});
    if(state.view == "home") return <WelcomeView setState={setState}/>
    else if(state.view == "register") return <Register setState={setState}/>
    else if(state.view == "login") return <Login setState={setState}/>

}
// Render the UI.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
