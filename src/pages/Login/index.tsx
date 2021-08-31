import React, { useEffect, useState } from "react"

import { Text, TextInput, TouchableOpacity } from "react-native"

import { ButtonLogin, Container, TextButtonLogin, TextLogin } from "./styles"

import { firebase } from "../../config/firebase"

export function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [loginError, setLoginError] = useState("")

  function loginInFirebase() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection("users")
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.")
              return
            }
            const user = firestoreDocument.data()
            navigation.navigate("Home", { user })
          })
          .catch((error) => {
            alert(error)
          })
      })
      .catch((error) => {
        alert(error)
      })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid
        console.log(uid)
        // ...
      } else {
        console.log("deu ruim")
      }
    })
  }, [])

  return (
    <Container>
      <TextLogin>Login</TextLogin>

      <TextInput
        placeholder="Your best e-mail address"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <TextInput
        placeholder="Password - 6 digits containing letters and numbers."
        onChangeText={(pass) => setPass(pass)}
        value={pass}
      />

      <ButtonLogin
        onPress={() => {
          loginInFirebase()
        }}
      >
        <TextButtonLogin>Login</TextButtonLogin>
      </ButtonLogin>
    </Container>
  )
}
