import React from "react"

import { Container, Header, Title, Date, Description } from "./styles"

export function StuffCard() {
  return (
    <Container>
      <Header>
        <Title>Read about i18n in RN</Title>

        <Date>15/09/21</Date>
      </Header>

      <Description>I will apply this function in my application.</Description>
    </Container>
  )
}
