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
  InboxList,
} from "./styles"
import { HighlightCard } from "../../component/HighlightCard"
import { DataStuffCardData, StuffCard } from "../../component/StuffCard"

export interface DataInboxList extends DataStuffCardData {
  id: string
}

export function Dashboard() {
  const data: DataInboxList[] = [
    {
      id: "1",
      type: "late",
      title: "Write the PDS article",
      date: "28/07/21",
      description: "",
    },
    {
      id: "2",
      type: "late",
      title: "Scientific basis PDS",
      date: "15/08/21",
      description: "Search for the scientific basis for the PDS",
    },
    {
      id: "3",
      type: "inAdvance",
      title: "Read about i18n in RN",
      date: "15/09/21",
      description: "",
    },
    {
      id: "4",
      type: "inAdvance",
      title: "Read about i18n in RN",
      date: "15/09/21",
      description: "I will this function in my application",
    },
    {
      id: "5",
      type: "inAdvance",
      title: "Read about i18n in RN",
      date: "15/09/21",
      description: "I will this function in my application",
    },
  ]

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

        <InboxList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StuffCard data={item} />}
        />
      </Inbox>
    </Container>
  )
}
