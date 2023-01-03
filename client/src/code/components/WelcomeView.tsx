// React imports.
import React, {useState} from "react";

import "bootstrap/dist/css/bootstrap.min.css"


/**
 * WelcomeView.
 */
const WelcomeView = ({setState}) => {
    return(
    <div style={{position: "relative", top: "40%", textAlign: "center", color: "#ff0000"}}>
        <h1>Welcome to Devour Forum!</h1>
        <button onClick={ () => setState({view: "register"})}>
            Register!
        </button>
        <button onClick={ () => setState({view: "login"})}>
            Login!
        </button>
    </div>
    )

}; /* WelcomeView. */


export default WelcomeView;
