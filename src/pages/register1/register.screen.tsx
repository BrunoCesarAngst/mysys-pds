import React, { useState } from "react"
import { Formik } from "formik"
import { Alert, SafeAreaView, View } from "react-native"
import { Appbar, Button, Card, Text, TextInput } from "react-native-paper"
import { HeaderComponent } from "../../component/header/header.component"
import { registerForm } from "./register.form"
import firebase from "firebase"

import { styles } from "./register.styles"

interface MyFormValues {
  email: string
  password: string
  confirm: string
}
interface Values {
  value: MyFormValues
}

export const RegisterScreen = () => {
  const initialValues: MyFormValues = { email: "", password: "", confirm: "" }
  const [values, setValues] = useState({} as Values)
  // if (values) console.log(values.value.email)

  const register = () => {}

  // const register = (values as Values) => {
  // firebase.auth().createUserWithEmailAndPassword(values, password)
  //   }},

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Register" />

      <View>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log({ values, actions })
            alert(JSON.stringify(values, null, 2))
            // actions.setSubmitting(false)
            // setValues(values.email)
            firebase
              .auth()
              .createUserWithEmailAndPassword(values.email, values.password)
              .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
                console.log(userCredential)
              })
              .catch((err) => {
                Alert.alert(err.message)
                console.log({ err })
              })
          }}
          validationSchema={registerForm}
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
                label="Password"
                secureTextEntry={true}
                right={<TextInput.Icon name="eye-off-outline" />}
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

              <TextInput
                label="Confirm password"
                secureTextEntry={true}
                right={<TextInput.Icon name="eye-off-outline" />}
                onChangeText={handleChange("confirm")}
                onFocus={() => setFieldTouched("confirm")}
                testID="confirm"
              />
              {touched.confirm && errors.confirm ? (
                <Text
                  testID="error-confirm"
                  style={{ color: "white", backgroundColor: "red" }}
                >
                  {errors.confirm}
                </Text>
              ) : null}

              <Button
                onPress={handleSubmit}
                mode="contained"
                style={styles.cardButton}
                disabled={errors.confirm ? true : false}
                testID="registerButton"
              >
                register
              </Button>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}
