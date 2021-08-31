import React from "react"

import { Container, Title, Date, Description } from "./styles"

export interface DataStuffCardData {
  type: "inAdvance" | "late"
  title: string
  date: string
  description: string
}
interface Props {
  data: DataStuffCardData
}

export function StuffCard({ data }: Props) {
  return (
    <Container>
      <Title type={data.type}>
        {data.type === "late" && "* "}
        {data.title}
      </Title>

      <Description>{data.description}</Description>

      <Date>{data.date}</Date>
    </Container>
  )
}
