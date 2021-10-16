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
  discerned: boolean
  fastAction?: boolean
  incubate?: boolean
  reference?: boolean
  trash?: boolean
  delegated?: boolean
  actionDate?: boolean
  context?: boolean
  project?: boolean
  completed?: boolean
}

const schemaForm = yup.object().shape({
  title: yup.string().required("O título deve ser informado."),
  description: yup.string(),
})
export function CollectStuff() {
  const route = useRoute<CollectStuffRoutProps>()

  const navigation = useNavigation<CollectStuffScreenNavigationProps>()

  const idStuff = route.params?.idStuff
  const title = route.params?.title
  const description = route.params?.description
  const discerned = route.params?.discerned

  // const [initialValues, setInitialValues] = useState({} as Stuff)

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
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        title: values.title,
        description: values.description,
        update: new Date().getTime(),
        dicerned: true,
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
        delegated: false,
        actionDate: false,
        context: false,
        project: false,
        completed: false,
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
      `Essa ação ${values.title}, depende de uma ou mais ações.`,
      "Devemos dividi-la em mais ações?",
      [
        {
          text: "Projeto",
          onPress: () => {
            console.log("was reported as a project")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                project: true,
                fastAction: false,
                incubate: false,
                reference: false,
                trash: false,
                delegated: false,
                actionDate: false,
                context: false,
                completed: false,
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

  async function context(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Essa ação ${values.title} precisa de um contexto!`,
      "Qual é o melhor contexto para agir sobre ele?",
      [
        {
          text: "Contexto",
          onPress: () => {
            console.log("it was reported as a context specific action")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                context: true,
                project: false,
                fastAction: false,
                incubate: false,
                reference: false,
                trash: false,
                delegated: false,
                actionDate: false,
                completed: false,
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

  async function actionDate(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Essa ação ${values.title}, precisa de uma data!`,
      "Qual é a melhor data para agir sobre ela?",
      [
        {
          text: "Agendar",
          onPress: () => {
            console.log("it was reported as a date-specific action")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                actionDate: true,
                project: false,
                fastAction: false,
                incubate: false,
                reference: false,
                trash: false,
                delegated: false,
                context: false,
                completed: false,
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

  async function delegate(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Essa ação: ${values.title}, vai ser delegada`,
      "Quem pode agir melhor sobre esta ação?",
      [
        {
          text: "Fulano",
          onPress: () => {
            console.log("was reported as a delegate action")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                delegated: true,
                project: false,
                fastAction: false,
                incubate: false,
                reference: false,
                trash: false,
                actionDate: false,
                context: false,
                completed: false,
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

  async function conditionalAction(
    values: Stuff,
    selectedStuff: CollectionFormData
  ) {
    Alert.alert(
      `Essa ação: ${values.title}, para ser executada, tem uma condição?`,
      "Preciso estar em um contexto, tem uma data específica, ou é melhor que eu a delegue?",
      [
        {
          text: "Contexto",
          onPress: () => {
            context(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Agenda",
          onPress: () => {
            actionDate(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Delegar",
          onPress: () => {
            delegate(values, selectedStuff)
          },
        },
      ],
      { cancelable: false }
    )
    console.log("was reported to be a conditional action")
  }

  async function simpleAction(
    values: Stuff,
    selectedStuff: CollectionFormData
  ) {
    Alert.alert(
      `Essa ação: ${values.title}`,
      "Isso leva menos de 2 minutos para ser feito?",
      [
        {
          text: "Não",
          onPress: () => {
            conditionalAction(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            console.log("was reported to be simple action of 2 min")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                fastAction: true,
                project: false,
                incubate: false,
                reference: false,
                trash: false,
                delegated: false,
                actionDate: false,
                context: false,
                completed: false,
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
    console.log("was reported to be simple action")
  }

  async function haveAction(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Essa ação: ${values.title}`,
      "É uma única ação simples?",
      [
        {
          text: "Não",
          onPress: () => {
            compoundAction(values, selectedStuff)
          },
        },
        {
          text: "Sim",
          onPress: () => {
            simpleAction(values, selectedStuff)
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    )
    console.log("was reported as have action")
  }

  async function noAction(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Essa informação: ${values.title}`,
      "Vai para onde?",
      [
        {
          text: "Lixeira",
          onPress: () => {
            console.log("was reported as no action trash")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                trash: true,
                project: false,
                fastAction: false,
                incubate: false,
                reference: false,
                delegated: false,
                actionDate: false,
                context: false,
                completed: false,
              })
            } catch (error) {
              console.log(error)
              Alert.alert("Não deu para editar!")
            }
          },
          style: "cancel",
        },
        {
          text: "Incubadora",
          onPress: () => {
            console.log("was reported as no action incubate")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                incubate: true,
                project: false,
                fastAction: false,
                reference: false,
                trash: false,
                delegated: false,
                actionDate: false,
                context: false,
                completed: false,
              })
            } catch (error) {
              console.log(error)
              Alert.alert("Não deu para editar!")
            }
          },
        },

        {
          text: "Referências",
          onPress: () => {
            console.log("was reported as no action reference")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                reference: true,
                project: false,
                fastAction: false,
                incubate: false,
                trash: false,
                delegated: false,
                actionDate: false,
                context: false,
                completed: false,
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
    console.log("was reported as no action")
  }

  const discern = async (values: Stuff, selectedStuff: CollectionFormData) => {
    Alert.alert(
      `Isso: ${values.title}`,
      "Tem ação ou não tem ação?",
      [
        {
          text: "Não tem ação",
          onPress: () => {
            noAction(values, selectedStuff)
          },
          style: "cancel",
        },
        {
          text: "Tem ação",
          onPress: () => {
            haveAction(values, selectedStuff)
          },
        },
      ],
      { cancelable: false }
    )
    console.log("was discerned")
    try {
      await db.collection("stuffs").doc(selectedStuff?.id).update({
        discerned: true,
        project: false,
        fastAction: false,
        incubate: false,
        reference: false,
        trash: false,
        delegated: false,
        actionDate: false,
        context: false,
        completed: false,
      })
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu para editar!")
    }
  }

  async function edit(values: Stuff, selectedStuff: CollectionFormData) {
    Alert.alert(
      `Isto: ${values.title}`,
      'O que você quer fazer com essas "coisas"?',
      [
        {
          text: "Nada",
          onPress: () => {
            navigation.navigate("Dashboard")
          },
          style: "cancel",
        },
        {
          text: "Discernir",
          onPress: () => discern(values, selectedStuff),
        },
      ],
      { cancelable: false }
    )
    console.log("was edited")
  }

  async function ActionComplete(
    values: Stuff,
    selectedStuff: CollectionFormData
  ) {
    Alert.alert(
      `Isso: ${values.title}`,
      "Essa ação foi concluída, ou quer colocar no lixo?",
      [
        {
          text: "Vai pro lixo",
          onPress: () => {
            console.log("was reported as no action reference")
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
          text: "Não",
          onPress: () => {
            edit(values, selectedStuff)
          },
        },
        {
          text: "Sim",
          onPress: () => {
            console.log("was reported as no action reference")
            try {
              db.collection("stuffs").doc(selectedStuff?.id).update({
                completed: true,
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
    console.log("was edited")
  }

  function NewStuff(selectedStuff: CollectionFormData) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            {idStuff ? (
              <Title>Editar a coisa</Title>
            ) : (
              <Title>Coletar uma coisa</Title>
            )}
          </Header>

          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              const theTitle = values.title
              const theDesc = values.description

              const selectedStuff = stuffs.find((stuff) => stuff.id === idStuff)

              if (selectedStuff?.discerned === true) {
                console.log("oi")
                ActionComplete(values, selectedStuff)
              } else if (selectedStuff) {
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
                  label="Título"
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
                  label="Descrição"
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
                    ? "Quero discernir essa coisa"
                    : idStuff
                    ? "Editar"
                    : "Coletar"}
                </Button>
                {idStuff && !touched.title && !touched.description ? (
                  <Text style={{ fontSize: 12, marginTop: 16, marginLeft: 40 }}>
                    Para editar, toque no campo título, descrição ou apenas
                    comece a discernir clicando no botão.
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
