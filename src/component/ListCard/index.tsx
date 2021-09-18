import React from "react"

import { Container, Header, Title, Icon, Amount } from "./styles"

interface Props {
  title: string
  type:
    | "fast"
    | "trash"
    | "incubated"
    | "reference"
    | "delegated"
    | "project"
    | "context"
    | "date"
  amount: string
}

const iconOfCard = {
  fast: "zap",
  trash: "trash-2",
  incubated: "stop-circle",
  reference: "package",
  delegated: "user-check",
  project: "layers",
  context: "hash",
  date: "clock",
}

export function ListCard({ title, type, amount }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Icon name={iconOfCard[type]} type={type} />
        <Title type={type}>{title}</Title>
        <Amount type={type}>{amount}</Amount>
      </Header>
    </Container>
  )
}
