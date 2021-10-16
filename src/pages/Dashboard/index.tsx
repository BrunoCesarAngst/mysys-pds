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
import { StuffCard } from "../../component/StuffCard"
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useStuffStoreDb, StuffTypeDb } from "../../stores/stuffDb"
import {
  useStuffStoreFormatted,
  FormattedStuffDb,
} from "../../stores/formattedStuffDb"

type DashboardScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Dashboard"
>
type DashboardRouteProps = RouteProp<AppNavigatorParamsList, "Dashboard">

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
  const [stuffs, setStuffs] = useState<FormattedStuffDb[]>([])

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
  }

  function stuffsTotalCollect() {
    if (currentStatusStuffDatabase.length > 0) {
      const entranceStuffsTotal = formattedStatusStuffDatabase.filter(
        (stuff) => {
          return stuff.discerned === false && stuff.completed === false
        }
      )
      console.log("stuffsTotalCollect")
      return entranceStuffsTotal.length.toString()
    } else {
      return "There is nothing..."
    }
  }
  const total = stuffsTotalCollect()
  // console.log({ total })

  function getTitleLastEntry() {
    if (currentStatusStuffDatabase.length > 0) {
      const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
        return stuff.discerned === false && stuff.completed === false
      })
      const lastInput = Math.max.apply(
        Math,
        stuffsCompleted.map((stuff) => new Date(stuff.date).getTime())
      )
      const lastTitle = stuffsCompleted.find((stuff) => {
        const date = new Date(stuff.date).getTime()
        if (date === lastInput) {
          return stuff.title
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
      const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
        return stuff.discerned === false && stuff.completed === false
      })
      const lastInput = Math.max.apply(
        Math,
        stuffsCompleted.map((stuff) => new Date(stuff.date).getTime())
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

    setIsLoading(false)

    console.log({ entranceStuffs })
  }

  function gettingStuffsDiscerned() {
    if (currentStatusStuffDatabase.length > 0) {
      const discernedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
        return stuff.discerned === true && stuff.completed === false
      })
      return discernedStuffs.length.toString()
    } else {
      return "There is nothing..."
    }
  }
  const discernedStuffsTotal = gettingStuffsDiscerned()

  function getTitleLastDiscerned() {
    if (currentStatusStuffDatabase.length > 0) {
      const stuffsDiscerned = currentStatusStuffDatabase.filter((stuff) => {
        return stuff.discerned === true && stuff.completed === false
      })
      const lastInput = Math.max.apply(
        Math,
        stuffsDiscerned.map((stuff) => new Date(stuff.date).getTime())
      )
      const lastTitleOfDiscerned = stuffsDiscerned.find((stuff) => {
        const date = new Date(stuff.date).getTime()
        if (date === lastInput) {
          return stuff.title
        }
      })

      return lastTitleOfDiscerned!.title
    } else {
      return "to discern "
    }
  }
  const lastTitleOfDiscerned = getTitleLastDiscerned()

  function getDateLastDiscerned() {
    if (currentStatusStuffDatabase.length > 0) {
      const stuffsDiscerned = currentStatusStuffDatabase.filter((stuff) => {
        return stuff.discerned === true && stuff.completed === false
      })
      const lastInput = Math.max.apply(
        Math,
        stuffsDiscerned.map((stuff) => new Date(stuff.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "here."
    }
  }
  const lastDateDiscerned = getDateLastDiscerned()

  function gettingStuffsCompleted() {
    if (currentStatusStuffDatabase.length > 0) {
      const completedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
        return stuff.discerned === true && stuff.completed === true
      })
      return completedStuffs.length.toString()
    } else {
      return "There is nothing..."
    }
  }
  const completedStuffsTotal = gettingStuffsCompleted()

  function getTitleLastCompleted() {
    if (currentStatusStuffDatabase.length > 0) {
      const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
        return stuff.completed
      })
      const lastInput = Math.max.apply(
        Math,
        stuffsCompleted.map((stuff) => new Date(stuff.date).getTime())
      )
      const lastTitleOfCompleted = stuffsCompleted.find((stuff) => {
        const date = new Date(stuff.date).getTime()
        if (date === lastInput) {
          return stuff.title
        }
      })

      return lastTitleOfCompleted!.title
    } else {
      return "to discern "
    }
  }
  const lastTitleOfCompleted = getTitleLastCompleted()

  function getDateLastCompleted() {
    if (currentStatusStuffDatabase.length > 0) {
      const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
        return stuff.completed
      })
      const lastInput = Math.max.apply(
        Math,
        stuffsCompleted.map((stuff) => new Date(stuff.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "here."
    }
  }
  const lastDateCompleted = getDateLastCompleted()

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
              amount={discernedStuffsTotal}
              lastInput={lastDateDiscerned}
              lastTitle={lastTitleOfDiscerned}
            />
            <HighlightCard
              type="done"
              title="Concluded"
              amount={completedStuffsTotal}
              lastInput={lastDateCompleted}
              lastTitle={lastTitleOfCompleted}
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
