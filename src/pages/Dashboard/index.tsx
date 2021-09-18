import React, { useState, useEffect, useCallback } from "react"
import { db } from "../../config/firebase"

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
import { RouteProp, useFocusEffect } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"

type DashboardScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Dashboard"
>
type DashboardRouteProps = RouteProp<AppNavigatorParamsList, "Dashboard">
export interface DataInboxList extends DataStuffCardData {
  id: string
}

export function Dashboard() {
  const [stuffs, setStuffs] = useState<DataInboxList[]>([])

  const navigation = useNavigation<DashboardScreenNavigationProps>()

  async function loadStuffs() {
    db.collection("stuffs").onSnapshot((query) => {
      const list: any[] = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })

      setStuffs(list)
    })

    try {
      const collectedStuffsFormatted: DataInboxList[] = stuffs.map(
        (item: DataInboxList) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            date: item.date,
            update: item.update,
          }
        }
      )

      setStuffs(collectedStuffsFormatted)
    } catch (error) {
      console.log("erro no map", error)
    }
  }
  useEffect(() => {
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
          data={stuffs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Collect", {
                  idStuff: item.id,
                  title: item.title,
                  description: item.description,
                  // date: item.date,
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
