// React imports.
import React from "react";


/**
 * WelcomeView.
 */
const WelcomeView = ({state}) => {
    return(
    <div style={{position: "relative", top: "40%", textAlign: "center", color: "#ff0000"}}>
        <h1>Welcome to Devour Chat!</h1>
        <button onClick={ () => state.currentView = "register" }>
            Register!
        </button>
    </div>
    )

}; /* WelcomeView. */


export default WelcomeView;
