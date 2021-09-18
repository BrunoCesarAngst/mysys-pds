import React, { useState, useEffect, useCallback } from "react"
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/core"
import { format } from "date-fns"

import { db } from "../../config/firebase"

import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from "react-hook-form"
import { NavigationStackProp } from "react-navigation-stack"
import { useNavigation } from "@react-navigation/native"

import { Button } from "../../component/Form/Button"
import { InputForm } from "../../component/Form/InputForm"
import { Container, Header, Title, Form, Fields } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"

type CollectStuffScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Collect"
>

type CollectStuffRoutProps = RouteProp<AppNavigatorParamsList, "Collect">

interface CollectionFormData {
  id: string
  title: string
  description: string
  date: string
  update: string
}

const schema = yup.object().shape({
  title: yup.string().required("The title must be reported."),
  description: yup.string(),
})
export function CollectStuff() {
  const [stuffs, setStuffs] = useState<CollectionFormData[]>([])

  useEffect(() => {
    db.collection("stuffs").onSnapshot((query) => {
      const list: any[] = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })

      setStuffs(list)
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      reset()
    }, [])
  )

  const route = useRoute<CollectStuffRoutProps>()

  const navigation = useNavigation<CollectStuffScreenNavigationProps>()

  const idStuff = route.params?.idStuff
  const title = route.params?.title
  const description = route.params?.description
  // const date = route.params?.date

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function collectAStuff(form: CollectionFormData) {
    try {
      const date = format(new Date(), "dd/MM/yy - HH:mm")

      await db.collection("stuffs").add({
        title: form.title,
        description: form.description,
        date: date,
        update: date,
      })

      navigation.setParams({
        idStuff: undefined,
        title: undefined,
        description: undefined,
      })

      navigation.navigate("Dashboard")
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu!")
    }
  }

  async function handleCollecting(form: CollectionFormData) {
    try {
      const date = format(new Date(), "dd/MM/yy - HH:mm")

      const selectedStuff = stuffs.find((stuff) => stuff.id === idStuff)
      if (selectedStuff) {
        await db.collection("stuffs").doc(selectedStuff.id).set({
          id: selectedStuff.id,
          title: form.title,
          description: form.description,
          date: selectedStuff.date,
          update: date,
        })
      } else {
        Alert.alert("Essa stuff não existe")
      }

      Alert.alert(
        form.title,
        "Want to clarify this entry?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      )

      navigation.setParams({
        idStuff: undefined,
        title: undefined,
        description: undefined,
      })

      navigation.navigate("Dashboard")
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
            <Title>Collecting Stuff</Title>
          </Header>

          <Form>
            <Fields>
              <InputForm
                name="title"
                control={control}
                placeholder="Title"
                autoCapitalize="sentences"
                autoCorrect={false}
                errorForm={errors.title && errors.title.message}
              />

              <InputForm
                name="description"
                control={control}
                placeholder="Description"
                errorForm={errors.description && errors.description.message}
              />
            </Fields>

            <Button title="Collect" onPress={handleSubmit(collectAStuff)} />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    )
  }

  function EditStuff() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Editing Stuff</Title>
          </Header>

          <Form>
            <Fields>
              <InputForm
                name="title"
                defaultValue={title}
                control={control}
                placeholder="Title"
                autoCapitalize="sentences"
                autoCorrect={false}
                errorForm={errors.title && errors.title.message}
              />

              <InputForm
                name="description"
                defaultValue={description}
                control={control}
                placeholder="Description"
                errorForm={errors.description && errors.description.message}
              />
            </Fields>

            <Button title="Edit" onPress={handleSubmit(handleCollecting)} />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    )
  }

  return <>{idStuff ? <EditStuff /> : <NewStuff />}</>
}
