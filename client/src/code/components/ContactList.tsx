// React imports.
import React from "react";

// Material-UI imports.
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Person from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";


/**
 * Contacts.
 */
const ContactList = ({ state }) => (

  <List>

    {state.contacts.map(value => {
      return (
        <ListItem key={ value } button onClick={ () => state.showContact(value._id, value.name, value.email) }>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ `${value.name}` } />
        </ListItem>
      );
    })}

  </List>

); /* End Contacts. */


export default ContactList;
