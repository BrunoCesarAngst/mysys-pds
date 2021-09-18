import React from "react"

import { Container, Title, Date, Description } from "./styles"

export interface DataStuffCardData {
  title: string
  description: string
  date: string
  update: string
}
interface Props {
  data: DataStuffCardData
}

export function StuffCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Description>{data.description}</Description>

      <Date>
        {data.date} ~ {data.update}
      </Date>
    </Container>
  )
}
