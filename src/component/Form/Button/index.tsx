import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"

import { Container, Title } from "./styles"

interface IProps {
  type: "cancel" | "edit"
}
interface Props extends RectButtonProps, IProps {
  title: string
  onPress: () => void
}

export function Button({ type, title, onPress, ...rest }: Props) {
  return (
    <Container type={type} onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
