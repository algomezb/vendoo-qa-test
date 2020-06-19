// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//------firebase conect -test- this part is copy from app.js
import "cypress-wait-until";
import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDesGS6qY9aebk9cooNVSgArESHJsjCaLM",
  authDomain: "vendoo-qa-test.firebaseapp.com",
  databaseURL: "https://vendoo-qa-test.firebaseio.com",
  projectId: "vendoo-qa-test",
  storageBucket: "vendoo-qa-test.appspot.com",
  messagingSenderId: "634735470268",
  appId: "1:634735470268:web:627e53318e9e4022e392b9",
};

const createFirebaseApp = () => {
  let app;
  if (firebase.apps.length) {
    app = firebase.apps[0];
  } else {
    app = firebase.initializeApp(firebaseConfig);
  }
};

//------------------------------------
Cypress.Commands.add(
  "add_file",
  {
    prevSubject: "element",
  },
  (input, fileName, fileType) => {
    cy.fixture(fileName)
      .then((content) => Cypress.Blob.base64StringToBlob(content, fileType))
      .then((blob) => {
        // We need the window to acces native (not nodejs) files and dt
        return cy.window().then((window) => {
          const testFile = new window.File([blob], fileName, {
            type: fileType,
          });
          const dataTransfer = new window.DataTransfer();
          dataTransfer.items.add(testFile);
          input[0].files = dataTransfer.files;
          return input;
        });
      });
  }
);
