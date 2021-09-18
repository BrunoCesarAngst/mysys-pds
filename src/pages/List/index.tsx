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
import { DataStuffCardData, StuffCard } from "../../component/StuffCard"
import { RouteProp, useFocusEffect } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"

type ListingScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Listing"
>
type ListingRouteProps = RouteProp<AppNavigatorParamsList, "Listing">
export interface DataInboxList extends DataStuffCardData {
  id: string
}

export function List() {
  const [stuffs, setStuffs] = useState<DataInboxList[]>([])

  const navigation = useNavigation<ListingScreenNavigationProps>()

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
            <User>
              <UserName>The lists</UserName>
            </User>
          </UserInfo>
        </UserWrapper>
      </Header>

      <Inbox>
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
