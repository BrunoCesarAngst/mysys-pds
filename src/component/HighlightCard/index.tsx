import React from "react"

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastInput,
} from "./styles"

interface Props {
  title: string
  type: "input" | "demand" | "done"
  amount: string
  lastInput: string
  lastTitle: string
}

const iconOfCard = {
  input: "download",
  demand: "target",
  done: "thumbs-up",
}

export function HighlightCard({
  title,
  type,
  amount,
  lastTitle,
  lastInput,
}: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={iconOfCard[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastInput type={type}>
          {lastTitle} - {lastInput}
        </LastInput>
      </Footer>
    </Container>
  )
}
