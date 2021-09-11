import React, { useState, useEffect } from "react"
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"

import { useForm } from "react-hook-form"
import { NavigationStackProp } from "react-navigation-stack"
import { useNavigation } from "@react-navigation/native"

import { Button } from "../../component/Form/Button"
import { InputForm } from "../../component/Form/InputForm"
import { Container, Header, Title, Form, Fields } from "./styles"

interface ICollectStuff {
  route: NavigationStackProp<any, any>
}

interface CollectionFormData {
  title: string
  description: string
}

const schema = yup.object().shape({
  title: yup.string().required("The title must be reported."),
  description: yup.string(),
})
export function CollectStuff({ route }: ICollectStuff) {
  const [validity, setValidity] = useState("")

  const navigation = useNavigation()

  console.log("no form", route.params?.id)
  console.log("no form", route.params?.title)
  console.log("no form", route.params?.description)

  const idStuff = route.params?.id
  const title = route.params?.title
  const description = route.params?.description

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function validityControl(type: "inAdvance" | "late") {
    setValidity(type)
  }

  async function handleEditionStuff(params: type) {}

  async function handleCollecting(form: CollectionFormData) {
    const newStuffs = {
      id: String(uuid.v4()),
      title: form.title,
      description: form.description,
      date: new Date(),
    }

    try {
      const stuffsCollectedOnTheDeviceKey = "@mysys:stuffs"

      const stuffsSavedInTheDevice = await AsyncStorage.getItem(
        stuffsCollectedOnTheDeviceKey
      )
      const currentData = stuffsSavedInTheDevice
        ? JSON.parse(stuffsSavedInTheDevice)
        : []

      const dataFormatted = [...currentData, newStuffs]

      await AsyncStorage.setItem(
        stuffsCollectedOnTheDeviceKey,
        JSON.stringify(dataFormatted)
      )

      reset()

      navigation.navigate("Inbox")
    } catch (error) {
      console.log(error)
      Alert.alert("Não deu!")
    }
  }

  // useEffect(() => {
  //   const stuffsCollectedOnTheDeviceKey = "@mysys:stuffs"
  //   // async function loadData() {
  //   //   const data = await AsyncStorage.getItem(stuffsCollectedOnTheDeviceKey)
  //   //   console.log(JSON.parse(data!))
  //   // }
  //   // loadData()

  //   async function removeAll() {
  //     await AsyncStorage.removeItem(stuffsCollectedOnTheDeviceKey)
  //   }

  //   removeAll()
  // }, [])

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
              defaultValue={title}
              autoCapitalize="sentences"
              autoCorrect={false}
              errorForm={errors.title && errors.title.message}
            />

            <InputForm
              name="description"
              control={control}
              placeholder="Description"
              defaultValue={description}
              errorForm={errors.description && errors.description.message}
            />
          </Fields>

          <Button title="Collect" onPress={handleSubmit(handleCollecting)} />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  )
}
