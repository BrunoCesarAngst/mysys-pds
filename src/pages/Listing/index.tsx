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
import { useNavigation, CommonActions } from "@react-navigation/native"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../../routes/types"
import { ListCard } from "../../component/ListCard"
import { useTheme } from "styled-components"

import { FastAction } from "../FastAction"
import { Context } from "../Context"
import { DatedAction } from "../DatedAction"
import { Delegated } from "../Delegated"
import { Project } from "../Project"
import { Incubated } from "../Incubated"
import { Reference } from "../Reference"
import { Trash } from "../Trash"

type ListingScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Listing"
>
type ListingRouteProps = RouteProp<AppNavigatorParamsList, "Listing">

function ListingScreen() {
  const theme = useTheme()

  const navigation = useNavigation<ListingScreenNavigationProps>()
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

      <HighlightCards>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FastAction")
          }}
        >
          <ListCard type="fast" title="Fast" amount="15" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Context")
          }}
        >
          <ListCard type="context" title="Context" amount="37" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DatedAction")
          }}
        >
          <ListCard type="date" title="Date" amount="37" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Delegated")
          }}
        >
          <ListCard type="delegated" title="Delegated" amount="37" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Project")
          }}
        >
          <ListCard type="project" title="Project" amount="37" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Incubated")
          }}
        >
          <ListCard type="incubated" title="Incubated" amount="37" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reference")
          }}
        >
          <ListCard type="reference" title="Reference" amount="37" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Trash")
          }}
        >
          <ListCard type="trash" title="Trash" amount="95" />
        </TouchableOpacity>
      </HighlightCards>
    </Container>
  )
}

const ListingStack = createStackNavigator()

export function Listing() {
  const navigation = useNavigation<ListingScreenNavigationProps>()

  return (
    <ListingStack.Navigator>
      <ListingStack.Screen
        name="The Lists"
        component={ListingScreen}
        options={{ headerShown: false }}
      />

      <ListingStack.Screen
        name="FastAction"
        component={FastAction}
        options={{
          title: "Fast Action",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Context"
        component={Context}
        options={{
          title: "Context",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="DatedAction"
        component={DatedAction}
        options={{
          title: "Dated Action",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Delegated"
        component={Delegated}
        options={{
          title: "Delegated",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Project"
        component={Project}
        options={{
          title: "Project",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Incubated"
        component={Incubated}
        options={{
          title: "Incubated",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Reference"
        component={Reference}
        options={{
          title: "Reference",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Trash"
        component={Trash}
        options={{
          title: "Trash",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />
    </ListingStack.Navigator>
  )
}
