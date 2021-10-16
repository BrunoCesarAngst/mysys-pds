import React, { useState, useEffect, useCallback } from "react"

import { useAuth } from "../../hooks/auth"

import { Container, Inbox, Title, InboxList } from "./styles"

import { StuffCard } from "../../component/StuffCard"
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  FormattedStuffDb,
  useStuffStoreFormatted,
} from "../../stores/formattedStuffDb"

type DatedActionScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "DatedAction"
>
type DatedActionRouteProps = RouteProp<AppNavigatorParamsList, "DatedAction">

export function DatedAction() {
  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )

  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<FormattedStuffDb[]>([])

  const navigation = useNavigation<DatedActionScreenNavigationProps>()
  const route = useRoute<DatedActionRouteProps>()

  const { signOut, user } = useAuth()

  function gettingStuffsDatedAction() {
    const datedActionStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.actionDate === true &&
        stuff.completed === false
      )
    })

    setStuffs(datedActionStuffs)

    setIsLoading(false)

    console.log({ datedActionStuffs })
  }

  useFocusEffect(
    useCallback(() => {
      gettingStuffsDatedAction()
    }, [formattedStatusStuffDatabase])
  )

  return (
    <Container>
      <Inbox>
        <Title>List</Title>
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
                  updated: item.updated,
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
