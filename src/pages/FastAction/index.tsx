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

type FastActionScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "FastAction"
>
type FastActionRouteProps = RouteProp<AppNavigatorParamsList, "FastAction">

export function FastAction() {
  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )

  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<FormattedStuffDb[]>([])

  const navigation = useNavigation<FastActionScreenNavigationProps>()
  const route = useRoute<FastActionRouteProps>()

  const { signOut, user } = useAuth()

  function gettingStuffsFast() {
    const fastStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.fastAction === true &&
        stuff.completed === false
      )
    })

    setStuffs(fastStuffs)

    setIsLoading(false)

    console.log({ fastStuffs })
  }

  useFocusEffect(
    useCallback(() => {
      gettingStuffsFast()
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
