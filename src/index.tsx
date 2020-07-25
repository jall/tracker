/* eslint-disable import/first */
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import React from "react"
import ReactDOM from "react-dom"

firebase.initializeApp({
  apiKey: "AIzaSyBaj8c0cRnk2DplDZVXGEoemgqz3hPH23s",
  authDomain: "tracker-jall.firebaseapp.com",
  databaseURL: "https://tracker-jall.firebaseio.com",
  projectId: "tracker-jall",
  storageBucket: "tracker-jall.appspot.com",
  messagingSenderId: "692454126753",
  appId: "1:692454126753:web:c5e1f56f7c669f1c99ace0",
})

import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
