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

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entradas</Title>
        <Icon name="inbox-arrow-down" />
      </Header>

      <Footer>
        <Amount>25</Amount>
        <LastInput>Last input: Fueling the car</LastInput>
      </Footer>
    </Container>
  )
}
