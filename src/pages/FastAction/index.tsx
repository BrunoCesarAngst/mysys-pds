import React, { useState, useEffect, useCallback } from "react"

import { useAuth } from "../../hooks/auth"

import { Container, Inbox, Header, Title, InboxList } from "./styles"

import { StuffCard } from "../../component/StuffCard"
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  FormattedStuffDb,
  useStuffStoreFormatted,
} from "../../stores/formattedStuffDb"
import { Switch } from "react-native-paper"

type FastActionScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "FastAction"
>
type FastActionRouteProps = RouteProp<AppNavigatorParamsList, "FastAction">

const StackFastCompleted = createStackNavigator()

export function FastAction() {
  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )

  const [isLoading, setIsLoading] = useState(true)
  const [stuffs, setStuffs] = useState<FormattedStuffDb[]>([])
  const [completed, setCompleted] = useState<FormattedStuffDb[]>([])
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

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

  function gettingStuffsFastCompleted() {
    const fastStuffsCompleted = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.fastAction === true &&
        stuff.completed === true
      )
    })

    setCompleted(fastStuffsCompleted)

    setIsLoading(false)

    console.log({ fastStuffsCompleted })
  }

  useFocusEffect(
    useCallback(() => {
      gettingStuffsFast()
      gettingStuffsFastCompleted()
    }, [formattedStatusStuffDatabase])
  )

  return (
    <>
      {!isSwitchOn ? (
        <Container>
          <Inbox>
            <Header>
              <Title>Para fazer</Title>
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
                      discerned: item.discerned,
                      completed: item.completed,
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
              <Title>Feito</Title>
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
