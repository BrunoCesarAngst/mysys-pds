import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../hooks/auth"

import { Container, Inbox, Title, InboxList, Header } from "./styles"

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
import { Switch } from "react-native-paper"

type DelegatedScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Delegated"
>
type DelegatedRouteProps = RouteProp<AppNavigatorParamsList, "Delegated">

export function Delegated() {
  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )

  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<FormattedStuffDb[]>([])
  const [completed, setCompleted] = useState<FormattedStuffDb[]>([])
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  const navigation = useNavigation<DelegatedScreenNavigationProps>()
  const route = useRoute<DelegatedRouteProps>()

  const { signOut, user } = useAuth()

  function gettingStuffsDelegated() {
    const delegatedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.delegated === true &&
        stuff.completed === false
      )
    })

    setStuffs(delegatedStuffs)

    setIsLoading(false)

    console.log({ delegatedStuffs })
  }

  function gettingStuffsDelegatedCompleted() {
    const delegatedStuffsCompleted = formattedStatusStuffDatabase.filter(
      (stuff) => {
        return (
          stuff.discerned === true &&
          stuff.delegated === true &&
          stuff.completed === true
        )
      }
    )

    setStuffs(delegatedStuffsCompleted)

    setIsLoading(false)

    console.log({ delegatedStuffsCompleted })
  }

  useFocusEffect(
    useCallback(() => {
      gettingStuffsDelegated()
      gettingStuffsDelegatedCompleted()
    }, [formattedStatusStuffDatabase])
  )

  return (
    <>
      {!isSwitchOn ? (
        <Container>
          <Inbox>
            <Header>
              <Title>Para acompanhar</Title>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </Header>
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
      ) : (
        <Container>
          <Inbox>
            <Header>
              <Title>Resolvido</Title>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </Header>
            <InboxList
              data={completed.sort((a, b) => a.date.localeCompare(b.date))}
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
      )}
    </>
  )
}
