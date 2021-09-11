import React, { useState, useEffect, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
  LogoutButton,
} from "./styles"
import { HighlightCard } from "../../component/HighlightCard"
import { DataStuffCardData, StuffCard } from "../../component/StuffCard"
import { useFocusEffect } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"

export interface DataInboxList extends DataStuffCardData {
  id: string
}

export function Dashboard() {
  const [data, setData] = useState<DataInboxList[]>([])
  const [currentDate, setCurrentDate] = useState("")

  const navigation = useNavigation()

  async function loadStuffs() {
    const stuffsCollectedOnTheDeviceKey = "@mysys:stuffs"

    const response = await AsyncStorage.getItem(stuffsCollectedOnTheDeviceKey)

    const collectedStuffs = response ? JSON.parse(response) : []

    let stuffInInbox = 0

    const collectedStuffsFormatted: DataInboxList[] = collectedStuffs.map(
      (item: DataInboxList) => {
        stuffInInbox++

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date))

        return {
          id: item.id,
          type: item.type,
          title: item.title,
          description: item.description,
          date,
        }
      }
    )

    setData(collectedStuffsFormatted)
    console.log(collectedStuffsFormatted)
  }
  useEffect(() => {
    let currentTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format()

    // console.log(
    //   new Intl.DateTimeFormat("en-US", {
    //     hour: "numeric",
    //     minute: "numeric",
    //   }).format()
    // )
    // setCurrentDate(currentTime)
    // console.log(currentTime)

    loadStuffs()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadStuffs()
    }, [])
  )

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log(item.id)
                navigation.navigate("Collect", {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                })
              }}
            >
              <StuffCard data={item} />
            </TouchableOpacity>
          )}
        />
      </Inbox>
    </Container>
  )
}
