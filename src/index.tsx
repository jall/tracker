/* eslint-disable import/first */
import {ChakraProvider} from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import log from "./logger"

firebase.initializeApp({
  apiKey: "AIzaSyBaj8c0cRnk2DplDZVXGEoemgqz3hPH23s",
  authDomain: "tracker-jall.firebaseapp.com",
  databaseURL: "https://tracker-jall.firebaseio.com",
  projectId: "tracker-jall",
  storageBucket: "tracker-jall.appspot.com",
  messagingSenderId: "692454126753",
  appId: "1:692454126753:web:c5e1f56f7c669f1c99ace0",
})

firebase
  .firestore()
  .enablePersistence()
  .then(() => log.info("Enabled offline persistence"))
  .catch((error) =>
    log.error("Failed to enable offline persistence", {
      error,
      reason: error.message,
    }),
  )

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import ServiceWorkerToast, {ServiceWorkerStatus} from "./ServiceWorkerToast"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <ServiceWorkerToast />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

serviceWorker.register({
  onSuccess: () =>
    window.dispatchEvent(
      new CustomEvent<ServiceWorkerStatus>("service-worker-status", {
        detail: "installed",
      }),
    ),
  onUpdate: () =>
    window.dispatchEvent(
      new CustomEvent<ServiceWorkerStatus>("service-worker-status", {
        detail: "ready-to-update",
      }),
    ),
})
