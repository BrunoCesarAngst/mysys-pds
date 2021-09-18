import React from "react"

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  UserName,
  HighlightCards,
} from "./styles"
import { RouteProp } from "@react-navigation/core"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { ListCard } from "../../component/ListCard"

type ListingScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Listing"
>
type ListingRouteProps = RouteProp<AppNavigatorParamsList, "Listing">

export function Listing() {
  const navigation = useNavigation<ListingScreenNavigationProps>()

  return (
    <>
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

        <HighlightCards>
          <TouchableOpacity>
            <ListCard type="fast" title="Fast" amount="15" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="trash" title="Trash" amount="95" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="incubated" title="Incubated" amount="37" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="reference" title="Reference" amount="37" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="delegated" title="Delegated" amount="37" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="project" title="Project" amount="37" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="context" title="Context" amount="37" />
          </TouchableOpacity>

          <TouchableOpacity>
            <ListCard type="date" title="Date" amount="37" />
          </TouchableOpacity>
        </HighlightCards>
      </Container>
    </>
  )
}
