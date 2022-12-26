// Style imports.


// React imports.
import React from "react";
import ReactDOM from "react-dom";

// App imports.
import BaseLayout from "./components/BaseLayout";
import * as Contacts from "./Contacts";


// Render the UI.
const baseComponent = ReactDOM.render(<BaseLayout/>, document.body);


// Now go fetch the user's mailboxes, and then their contacts.
baseComponent.state.showHidePleaseWait(true);
  // Now go fetch the user's contacts.
  async function getContacts() {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
    contacts.forEach((inContact) => {
      baseComponent.state.addContactToList(inContact);
    });
  }

  getContacts().then(() => baseComponent.state.showHidePleaseWait(false));

