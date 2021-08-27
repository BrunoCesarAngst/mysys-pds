import React from "react"

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Inbox,
  Title,
} from "./styles"
import { HighlightCard } from "../../component/HighlightCard"
import { StuffCard } from "../../component/StuffCard"

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/42010291?v=4",
              }}
            />
            <User>
              <UserGreeting>Hi,</UserGreeting>
              <UserName>Bruno</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="input"
          title="Entries"
          amount="15"
          lastInput="Go to Market"
        />
        <HighlightCard
          type="demand"
          title="Demands"
          amount="95"
          lastInput="Study pointers"
        />
        <HighlightCard
          type="done"
          title="Concluded"
          amount="37"
          lastInput="Talk to Ellon"
        />
      </HighlightCards>

      <Inbox>
        <Title>Inbox</Title>
        <StuffCard />
      </Inbox>
    </Container>
  )
}
