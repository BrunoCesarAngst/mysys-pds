import React from "react"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Keyboard, TouchableWithoutFeedback } from "react-native"

import { Button } from "../../component/Form/Button"
import { InputForm } from "../../component/Form/InputForm"

import { Container, Header, Title, Form, Fields } from "./styles"

interface CollectionFormData {
  title: string
  description: string
}

const schema = yup.object().shape({
  title: yup.string().required("The title must be reported."),
  description: yup.string(),
})
export function CollectStuff() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleCollecting(form: CollectionFormData) {
    const data = {
      title: form.title,
      description: form.description,
    }

    console.log(data)
  }

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

          <Button title="Collect" onPress={handleSubmit(handleCollecting)} />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  )
}
