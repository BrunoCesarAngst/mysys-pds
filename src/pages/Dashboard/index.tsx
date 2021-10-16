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

  function gettingStuffsInput() {
    const entranceStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === false && stuff.completed === false
    })

    setStuffs(entranceStuffs)

    setIsLoading(false)

    console.log({ entranceStuffs })
  }

  function stuffsTotalCollect() {
    const entranceStuffsTotal = formattedStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === false && stuff.completed === false
    })
    if (entranceStuffsTotal.length > 0) {
      console.log("stuffsTotalCollect")
      return entranceStuffsTotal.length.toString()
    } else {
      return "Não há coleta!"
    }
  }
  const total = stuffsTotalCollect()
  // console.log({ total })

  function getTitleLastEntry() {
    const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === false && stuff.completed === false
    })
    if (stuffsCompleted.length > 0) {
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
      return "Colete "
    }
  }
  const lastTitle = getTitleLastEntry()
  // console.log({ lastTitle })

  function getDateLastEntry() {
    const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === false && stuff.completed === false
    })
    if (stuffsCompleted.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        stuffsCompleted.map((stuff) => new Date(stuff.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "Clicando em coletar."
    }
  }
  const lastDate = getDateLastEntry()
  // console.log({ lastDate })

  function gettingStuffsDiscerned() {
    const discernedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === true && stuff.completed === false
    })
    if (discernedStuffs.length > 0) {
      return discernedStuffs.length.toString()
    } else {
      return "Não há demandas!"
    }
  }
  const discernedStuffsTotal = gettingStuffsDiscerned()

  function getTitleLastDiscerned() {
    const stuffsDiscerned = currentStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === true && stuff.completed === false
    })
    if (stuffsDiscerned.length > 0) {
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
      return "Esvazie a mente "
    }
  }
  const lastTitleOfDiscerned = getTitleLastDiscerned()

  function getDateLastDiscerned() {
    const stuffsDiscerned = currentStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === true && stuff.completed === false
    })
    if (stuffsDiscerned.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        stuffsDiscerned.map((stuff) => new Date(stuff.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "Clicando em coletar."
    }
  }
  const lastDateDiscerned = getDateLastDiscerned()

  function gettingStuffsCompleted() {
    const completedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return stuff.discerned === true && stuff.completed === true
    })
    if (completedStuffs.length > 0) {
      return completedStuffs.length.toString()
    } else {
      return '"Mate" - Elimine ...'
    }
  }
  const completedStuffsTotal = gettingStuffsCompleted()

  function getTitleLastCompleted() {
    const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
      return stuff.completed
    })
    if (stuffsCompleted.length > 0) {
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
      return "tudo aquilo "
    }
  }
  const lastTitleOfCompleted = getTitleLastCompleted()

  function getDateLastCompleted() {
    const stuffsCompleted = currentStatusStuffDatabase.filter((stuff) => {
      return stuff.completed
    })
    if (stuffsCompleted.length > 0) {
      const lastInput = Math.max.apply(
        Math,
        stuffsCompleted.map((stuff) => new Date(stuff.date).getTime())
      )

      return format(new Date(lastInput), "dd/MM/yy - HH:mm")
    } else {
      return "que te prende."
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
                  <UserGreeting>Olá,</UserGreeting>
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
              title="Entradas"
              amount={total}
              lastInput={lastDate}
              lastTitle={lastTitle}
            />
            <HighlightCard
              type="demand"
              title="Demandas"
              amount={discernedStuffsTotal}
              lastInput={lastDateDiscerned}
              lastTitle={lastTitleOfDiscerned}
            />
            <HighlightCard
              type="done"
              title="Concluídas"
              amount={completedStuffsTotal}
              lastInput={lastDateCompleted}
              lastTitle={lastTitleOfCompleted}
            />
          </HighlightCards>

          <Inbox>
            <Title>Caixa de Entradas</Title>

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
