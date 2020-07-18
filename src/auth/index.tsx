import React from "react"
import * as firebase from "firebase"

export default function Auth() {
  const containerId = "firebaseui-auth-container"

  import("firebaseui").then((firebaseUI) => {
    const ui =
      firebaseUI.auth.AuthUI.getInstance() ??
      new firebaseUI.auth.AuthUI(firebase.auth())

    ui.start(`#${containerId}`, {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
      signInFlow: "popup",
    })
  })

  return (
    <>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
      />
      <div id={containerId}></div>
    </>
  )
}
