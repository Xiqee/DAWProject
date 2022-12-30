
// React imports.
import React, { Component } from "react";

// Library imports.
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// App imports.
import Toolbar from "./Toolbar";
import ConversationList from "./ConversationList";
import WelcomeView from "./WelcomeView";
import ConversationView from "./ConversationView";
import Login from "./Login"
import Register from "./Register"
import { createState } from "../state";


/**
 * BaseLayout.
 */
class BaseLayout extends Component {


  /**
   * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
   * ever have to pass this entire object down through props (not necessarily the best design in terms of data
   * encapsulation, but it does have the benefit of being quite a bit simpler).
   */
  state = createState(this);


  /**
   * Render().
   */
  render() {

    return (
      <div className="appContainer">
        <div className="centerArea">
         <div className="centerViews">
             { this.state.currentView === "register" && <Register state = {this.state} /> }
             { this.state.currentView === "login" && <Login state = {this.state} /> }
           { this.state.currentView === "welcome" && <WelcomeView state = {this.state} /> }
         </div>
        </div>
      </div>
    );

  } /* End render(). */


} /* End class. */


export default BaseLayout;
