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
import useStuffStoreDb, { StuffTypeDb } from "../../stores/stuffDb"
import useStuffStoreFormatted from "../../stores/formattedStuffDb"

type DashboardScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Dashboard"
>
type DashboardRouteProps = RouteProp<AppNavigatorParamsList, "Dashboard">
export interface DataInboxList extends DataStuffCardData {
  id: string
  userId: string
}

export function Dashboard() {
  const currentStatusStuffDatabase = useStuffStoreDb((state) => state.stuffsDbs)
  const addDatabaseStuffInTheStates = useStuffStoreDb(
    (state) => state.addDatabaseStuffInTheState
  )

  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )
  const formattedDatabaseStuffInTheStates = useStuffStoreFormatted(
    (state) => state.formattedDatabaseStuffInTheState
  )

  // console.log({ formattedStatusStuffDatabase })

  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<DataInboxList[]>([])

  const navigation = useNavigation<DashboardScreenNavigationProps>()
  const route = useRoute<DashboardRouteProps>()

  const theme = useTheme()

  const { signOut, user } = useAuth()

  async function getStuffsDb() {
    try {
      await db
        .collection("stuffs")
        .where("userId", "==", user.userId)
        .onSnapshot((query) => {
          const list: StuffTypeDb[] = []
          query.forEach((doc) => {
            list.push({ ...(doc.data() as StuffTypeDb), id: doc.id })
          })

          addDatabaseStuffInTheStates(list)
          formattedStuffsDb(list)
          console.log("getStuffsDb")
        })
    } catch (error) {
      console.log("no loadStuffs", error)
    }
  }

  function formattedStuffsDb(list: StuffTypeDb[]) {
    const formattedStuffs = list.map((stuffDB) => {
      return {
        id: stuffDB.id,
        title: stuffDB.title,
        description: stuffDB.description,
        date: format(new Date(stuffDB.date), "dd/MM/yy - HH:mm"),
        update: format(new Date(stuffDB.update), "dd/MM/yy - HH:mm"),
        userId: stuffDB.userId,
        discerned: stuffDB.discerned,
        fastAction: stuffDB.fastAction,
        incubate: stuffDB.incubate,
        reference: stuffDB.reference,
        trash: stuffDB.trash,
        delegated: stuffDB.delegated,
        actionDate: stuffDB.actionDate,
        context: stuffDB.context,
        project: stuffDB.project,
        completed: stuffDB.completed,
      }
    })

    console.log("formattedStuffsDb")

    formattedDatabaseStuffInTheStates(formattedStuffs)
    setIsLoading(false)
  }

  function stuffsTotalCollect() {
    if (currentStatusStuffDatabase.length > 0) {
      console.log("stuffsTotalCollect")
      console.log(currentStatusStuffDatabase.length)
      return currentStatusStuffDatabase.length.toString()
    } else {
      return "There is nothing..."
    }
  }
  const total = stuffsTotalCollect()
  // console.log({ total })

  function getTitleLastEntry() {
    if (currentStatusStuffDatabase.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        currentStatusStuffDatabase.map((item) => new Date(item.date).getTime())
      )
      const lastTitle = currentStatusStuffDatabase.find((item) => {
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
  const lastTitle = getTitleLastEntry()
  // console.log({ lastTitle })

  function getDateLastEntry() {
    if (currentStatusStuffDatabase.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        currentStatusStuffDatabase.map((item) => new Date(item.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "here."
    }
  }
  const lastDate = getDateLastEntry()
  // console.log({ lastDate })

  function gettingStuffsInput() {
    const entranceStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === false && stuff.completed === false
    })

    setStuffs(entranceStuffs)

    console.log({ entranceStuffs })
  }

  const now = format(new Date(), "dd/MM/yy - HH:mm")

  useEffect(() => {
    console.log("useEffect")

    gettingStuffsInput()
  }, [formattedStatusStuffDatabase])

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect")

      getStuffsDb()
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
              amount={total}
              lastInput={lastDate}
              lastTitle={lastTitle}
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
