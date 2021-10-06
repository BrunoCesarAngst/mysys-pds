import React, { useState, useEffect, useCallback } from "react"
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/core"
import { format } from "date-fns"

import { db } from "../../config/firebase"

import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/auth"

import { useNavigation } from "@react-navigation/native"

import { Container, Header, Title, Form, Fields, Buttons } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { Formik, useFormik } from "formik"
import { Button, Text, TextInput } from "react-native-paper"

type CollectStuffScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Collect"
>

type CollectStuffRoutProps = RouteProp<AppNavigatorParamsList, "Collect">

interface TypeProp {
  type: "cancel" | "edit"
}

interface Stuff {
  title: string
  description?: string
}

interface CollectionFormData {
  id: string
  title: string
  description: string
  date: string
  update: string
  userId: string
}

const schemaForm = yup.object().shape({
  title: yup.string().required("The title must be reported."),
  description: yup.string(),
})
export function CollectStuff() {
  const route = useRoute<CollectStuffRoutProps>()

  const navigation = useNavigation<CollectStuffScreenNavigationProps>()

  const idStuff = route.params?.idStuff
  const title = route.params?.title
  const description = route.params?.description
  // const date = route.params?.date

  const initialValues: Stuff = {
    title: title ? title : "",
    description: description ? description : "",
  }

  const [stuffs, setStuffs] = useState<CollectionFormData[]>([])

  const { user } = useAuth()

  useEffect(() => {
    db.collection("stuffs").onSnapshot((query) => {
      const list: any[] = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })

      setStuffs(list)
    })
  }, [])

  async function editStuff(values: Stuff, selectedStuff: CollectionFormData) {
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).set({
        id: selectedStuff?.id,
        title: values.title,
        description: values.description,
        date: selectedStuff?.date,
        update: new Date().getTime(),
        userId: user.userId,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function newStuff(values: Stuff) {
    try {
      await db.collection("stuffs").add({
        title: values.title,
        description: values.description,
        date: new Date().getTime(),
        update: new Date().getTime(),
        userId: user.userId,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu!")
    }
  }

  function NewStuff() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            {idStuff ? (
              <Title>Edit Stuff</Title>
            ) : (
              <Title>Collecting Stuff</Title>
            )}
          </Header>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              const selectedStuff = stuffs.find((stuff) => stuff.id === idStuff)
              if (selectedStuff) {
                editStuff(values, selectedStuff)
              } else {
                newStuff(values)
              }

              navigation.setParams({
                idStuff: undefined,
                title: undefined,
                description: undefined,
              })

              navigation.navigate("Dashboard")
            }}
            validationSchema={schemaForm}
          >
            {({
              handleSubmit,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <Fields>
                <TextInput
                  label="Title"
                  onChangeText={handleChange("title")}
                  onFocus={() => setFieldTouched("title")}
                  value={values.title}
                />
                {touched.title && errors.title ? (
                  <Text style={{ color: "white", backgroundColor: "red" }}>
                    {errors.title}
                  </Text>
                ) : null}

                <TextInput
                  label="Description"
                  multiline
                  numberOfLines={3}
                  onChangeText={handleChange("description")}
                  onFocus={() => setFieldTouched("description")}
                  value={values.description}
                />
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={values.title == "" || errors.title ? true : false}
                >
                  {idStuff ? "Edit" : "Collect"}
                </Button>
              </Fields>
            )}
          </Formik>
        </Container>
      </TouchableWithoutFeedback>
    )
  }

  return <NewStuff />
}
