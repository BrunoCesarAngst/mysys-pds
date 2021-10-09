import React, { useState, useEffect } from "react"
import { RouteProp, useRoute } from "@react-navigation/core"

import { db } from "../../config/firebase"

import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native"
import * as yup from "yup"

import { useAuth } from "../../hooks/auth"

import { useNavigation } from "@react-navigation/native"

import { Container, Header, Title, Form, Fields } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { Formik } from "formik"
import { Button, Text, TextInput } from "react-native-paper"

type CollectStuffScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Collect"
>

type CollectStuffRoutProps = RouteProp<AppNavigatorParamsList, "Collect">

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
  updated: boolean
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
  const updated = route.params?.updated

  // const [initialValues, setInitialValues] = useState({} as Stuff)

  const initialValues: Stuff = {
    title: title ? title : "",
    description: description ? description : "",
  }

  const [stuffs, setStuffs] = useState<CollectionFormData[]>([])

  const { user } = useAuth()

  // useEffect(() => {
  //   setInitialValues({
  //     title: title ? title : "",
  //     description: description ? description : "",
  //   })
  // }, [title, description])

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
        discerned: false,
        fastAction: false,
        incubate: false,
        reference: false,
        trash: false,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu!")
    }
  }

  async function compoundAction(
    values: Stuff,
    selectedStuff: CollectionFormData
  ) {
    Alert.alert(
      `This action: ${values.title}`,
      "This takes less than 2 minutes to do?",
      [
        {
          text: "Project",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    )
    console.log("dicernido")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        compoundAction: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function context(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `This action: ${values.title}`,
      "This takes less than 2 minutes to do?",
      [
        {
          text: "Context",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    )
    console.log("dicernido")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        context: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function actionDate(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `This action: ${values.title}`,
      "This takes less than 2 minutes to do?",
      [
        {
          text: "Action date",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    )
    console.log("dicernido")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        actionDate: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }
  async function delegate(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `This action: ${values.title}`,
      "This takes less than 2 minutes to do?",
      [
        {
          text: "Fulano",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    )
    console.log("dicernido")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        delegated: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function conditionalAction(
    values: Stuff,
    selectedStuff: CollectionFormData
  ) {
    Alert.alert(
      `This action: ${values.title}`,
      "This takes less than 2 minutes to do?",
      [
        {
          text: "Context",
          onPress: () => {
            context(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Date",
          onPress: () => {
            actionDate(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Delegate",
          onPress: () => {
            delegate(values, selectedStuff)
          },
        },
      ],
      { cancelable: false }
    )
    console.log("dicernido")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        conditionalAction: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function simpleAction(
    values: Stuff,
    selectedStuff: CollectionFormData
  ) {
    Alert.alert(
      `This action: ${values.title}`,
      "This takes less than 2 minutes to do?",
      [
        {
          text: "No",
          onPress: () => {
            conditionalAction(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                fastAction: true,
              })
            } catch (error) {
              console.log(error)
              Alert.alert("Não deu para editar!")
            }
          },
        },
      ],
      { cancelable: false }
    )
  }

  async function haveAction(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `The Action : ${values.title}`,
      "Does it have a single simple action?",
      [
        {
          text: "No",
          onPress: () => {
            compoundAction(values, selectedStuff)
          },
        },
        {
          text: "Yes",
          onPress: () => {
            simpleAction(values, selectedStuff)
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    )
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        action: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function noAction(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `That information: ${values.title}`,
      "Go where?",
      [
        {
          text: "Trash",
          onPress: () => {
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                trash: true,
              })
            } catch (error) {
              console.log(error)
              Alert.alert("Não deu para editar!")
            }
          },
          style: "cancel",
        },
        {
          text: "Incubate",
          onPress: () => {
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                incubate: true,
              })
            } catch (error) {
              console.log(error)
              Alert.alert("Não deu para editar!")
            }
          },
        },

        {
          text: "Reference",
          onPress: () => {
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                reference: true,
              })
            } catch (error) {
              console.log(error)
              Alert.alert("Não deu para editar!")
            }
          },
        },
      ],
      { cancelable: false }
    )
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        information: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  const discern = async (values: Stuff, selectedStuff: CollectionFormData) => {
    Alert.alert(
      `Stuff: ${values.title}`,
      "Does it have action or no action?",
      [
        {
          text: "No action",
          onPress: () => {
            noAction(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Have action",
          onPress: () => {
            haveAction(values, selectedStuff)
          },
        },
      ],
      { cancelable: false }
    )
    console.log("dicernido")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        discerned: true,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function edit(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Stuff: ${values.title}`,
      "What do you want to do with this stuff?",
      [
        {
          text: "Nothing",
          onPress: () => {
            navigation.navigate("Dashboard")
          },
          style: "cancel",
        },
        {
          text: "Discern",
          onPress: () => discern(values, selectedStuff),
        },
      ],
      { cancelable: false }
    )
  }

  function NewStuff(selectedStuff: CollectionFormData) {
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
            onSubmit={(values, { resetForm }) => {
              const selectedStuff = stuffs.find((stuff) => stuff.id === idStuff)

              if (selectedStuff) {
                editStuff(values, selectedStuff)
                edit(values, selectedStuff)
              } else {
                newStuff(values)
              }

              resetForm()

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
                  {idStuff && !touched.title && !touched.description
                    ? "I want to dicern this stuff"
                    : idStuff
                    ? "Edit"
                    : "Collect"}
                </Button>
                {idStuff && !touched.title && !touched.description ? (
                  <Text style={{ fontSize: 12, marginTop: 16, marginLeft: 70 }}>
                    To edit tap the title or description field.
                  </Text>
                ) : null}
              </Fields>
            )}
          </Formik>
        </Container>
      </TouchableWithoutFeedback>
    )
  }

  return <NewStuff />
}
