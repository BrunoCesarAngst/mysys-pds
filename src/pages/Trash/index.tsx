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

type TrashScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Trash"
>
type TrashRouteProps = RouteProp<AppNavigatorParamsList, "Trash">

export function Trash() {
  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )

  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<FormattedStuffDb[]>([])

  const navigation = useNavigation<TrashScreenNavigationProps>()
  const route = useRoute<TrashRouteProps>()

  const { signOut, user } = useAuth()

  function gettingStuffsTrash() {
    const trashStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.trash === true &&
        stuff.completed === false
      )
    })

    setStuffs(trashStuffs)

    setIsLoading(false)

    console.log({ trashStuffs })
  }

  useFocusEffect(
    useCallback(() => {
      gettingStuffsTrash()
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
