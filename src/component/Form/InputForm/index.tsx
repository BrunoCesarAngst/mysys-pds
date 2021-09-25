import React from "react"
import { Control, Controller } from "react-hook-form"

import { TextInputProps } from "react-native"
import { Input } from "../Input"

import { Container, ErrorForm } from "./styles"

interface Props extends TextInputProps {
  control: Control
  name: string
  errorForm: string
}

export function InputForm({ control, name, errorForm, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            defaultValue={value}
            {...rest}
          />
        )}
        name={name}
      />
      {errorForm && <ErrorForm>{errorForm}</ErrorForm>}
    </Container>
  )
}
