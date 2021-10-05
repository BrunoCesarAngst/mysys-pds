import { Formik } from "formik"
import React from "react"
import { Alert, SafeAreaView, View } from "react-native"
import { Button, Card, Text, TextInput } from "react-native-paper"
import { loginForm } from "./login.form"
import firebase from "firebase"

import { styles } from "./login.styles"

export const LoginScreen = () => {
  const login = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Card>
          <Card.Title title="mySys"></Card.Title>
          <Card.Content>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, actions) => {
                console.log({ values, actions })
                alert(JSON.stringify(values, null, 2))
                // actions.setSubmitting(false)
                // setValues(values.email)
                firebase
                  .auth()
                  .signInWithEmailAndPassword(values.email, values.password)
                  .then((userCredential) => {
                    const user = userCredential.user
                    console.log(user.uid)
                    console.log(userCredential)
                  })
                  .catch((err) => {
                    Alert.alert(err.message)
                    console.log({ err })
                  })
              }}
              validationSchema={loginForm}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                values,
              }) => (
                <>
                  <TextInput
                    label="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onFocus={() => setFieldTouched("email")}
                    testID="email"
                  />
                  {touched.email && errors.email ? (
                    <Text
                      testID="error-email"
                      style={{ color: "white", backgroundColor: "red" }}
                    >
                      {errors.email}
                    </Text>
                  ) : null}

                  <TextInput
                    label="password"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onFocus={() => setFieldTouched("password")}
                    testID="password"
                  />
                  {touched.password && errors.password ? (
                    <Text
                      testID="error-password"
                      style={{ color: "white", backgroundColor: "red" }}
                    >
                      {errors.password}
                    </Text>
                  ) : null}

                  <Button
                    uppercase={false}
                    style={styles.cardButton}
                    disabled={values.email == "" || errors.email ? true : false}
                    testID="recovery-button"
                  >
                    Forgot email/Password
                  </Button>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    style={styles.cardButton}
                    testID="loginButton"
                  >
                    login
                  </Button>
                  <Button style={styles.cardButton}>register</Button>
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  )
}
