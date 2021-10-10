import React, { useState, useEffect, useCallback } from "react"
import { db } from "../../config/firebase"
import { format } from "date-fns"

import { useTheme } from "styled-components"
import { useAuth } from "../../hooks/auth"

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
  LoadContainer,
} from "./styles"

import { HighlightCard } from "../../component/HighlightCard"
import { DataStuffCardData, StuffCard } from "../../component/StuffCard"
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type DashboardScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Dashboard"
>
type DashboardRouteProps = RouteProp<AppNavigatorParamsList, "Dashboard">
export interface DataInboxList extends DataStuffCardData {
  id: string
  userId: string
}

interface HighlightProps {
  amount: string
  lastInput: string
  lastTitle: string
}

interface IHighlightData {
  input: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<DataInboxList[]>([])
  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData
  )
  const navigation = useNavigation<DashboardScreenNavigationProps>()
  const route = useRoute<DashboardRouteProps>()

  const theme = useTheme()

  const { signOut, user } = useAuth()

  function getStuffsTotalCollect(collection: DataInboxList[]) {
    if (collection.length > 0) {
      return collection.length.toString()
    } else {
      return "There is nothing..."
    }
  }

  function getLastCollectTitle(collection: DataInboxList[]) {
    if (collection.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        collection.map((item) => new Date(item.date).getTime())
      )
      const lastTitle = collection.find((item) => {
        const date = new Date(item.date).getTime()
        if (date === lastInput) {
          return item.title
        }
      })

      return lastTitle!.title
    } else {
      return "to discern "
    }
  }

  function getLastCollectDate(collection: DataInboxList[]) {
    if (collection.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        collection.map((item) => new Date(item.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "here."
    }
  }

  async function loadStuffs() {
    try {
      await db
        .collection("stuffs")
        .where("userId", "==", user.userId)
        .where("discerned", "==", false)
        .onSnapshot((query) => {
          const list: DataInboxList[] = []
          query.forEach((doc) => {
            list.push({ ...(doc.data() as DataInboxList), id: doc.id })
          })

          handlingTheStuffThatComesFromTheDatabase(list)
        })
    } catch (error) {
      console.log("no loadStuffs", error)
    }
  }

  const now = format(new Date(), "dd/MM/yy - HH:mm")

  async function handlingTheStuffThatComesFromTheDatabase(
    list: DataInboxList[]
  ) {
    try {
      const lastInputDate = getLastCollectDate(list)
      const totalStuffs = getStuffsTotalCollect(list)
      const lastTitle = getLastCollectTitle(list)

      const collectedStuffs: DataInboxList[] = await list.map(
        (item: DataInboxList) => {
          const teste1 = new Date(item.date)
          const teste2 = new Date(item.update)

          const date = format(teste1, "dd/MM/yy - HH:mm")
          const update = format(teste2, "dd/MM/yy - HH:mm")

          return {
            id: item.id,
            title: item.title,
            description: item.description,
            date,
            update,
            userId: item.userId,
          }
        }
      )

      setStuffs(collectedStuffs)

      setHighlightData({
        input: {
          amount: totalStuffs,
          lastInput: lastInputDate,
          lastTitle: lastTitle,
        },
      })
    } catch (error) {
      console.log("erro no map", error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadStuffs()
    }, [])
  )

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Hi,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="input"
              title="Entries"
              amount={highlightData.input.amount}
              lastInput={highlightData.input.lastInput}
              lastTitle={highlightData.input.lastTitle}
            />
            <HighlightCard
              type="demand"
              title="Demands"
              amount="95"
              lastInput="Study pointers"
              lastTitle="1"
            />
            <HighlightCard
              type="done"
              title="Concluded"
              amount="37"
              lastInput="Talk to Ellon"
              lastTitle="2"
            />
          </HighlightCards>

          <Inbox>
            <Title>Inbox</Title>

            <InboxList
              data={stuffs.sort((a, b) => a.date.localeCompare(b.date))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Collect", {
                      idStuff: item.id,
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
        </>
      )}
    </Container>
  )
}
