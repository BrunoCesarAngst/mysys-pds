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
import { useStuffStoreFormatted } from "../../stores/formattedStuffDb"

type ListingScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Listing"
>
type ListingRouteProps = RouteProp<AppNavigatorParamsList, "Listing">

function ListingScreen() {
  const formattedStatusStuffDatabase = useStuffStoreFormatted(
    (state) => state.stuffFormatted
  )

  const theme = useTheme()

  const navigation = useNavigation<ListingScreenNavigationProps>()

  function gettingStuffsFast() {
    const fastStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.fastAction === true &&
        stuff.completed === false
      )
    })
    return fastStuffs.length.toString()
  }
  const fastStuffsTotal = gettingStuffsFast()

  function gettingStuffsContext() {
    const contextStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.context === true &&
        stuff.completed === false
      )
    })
    return contextStuffs.length.toString()
  }
  const contextStuffsTotal = gettingStuffsContext()

  function gettingStuffsDatedAction() {
    const datedActionStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.actionDate === true &&
        stuff.completed === false
      )
    })
    return datedActionStuffs.length.toString()
  }
  const datedActionStuffsTotal = gettingStuffsDatedAction()

  function gettingStuffsDelegated() {
    const delegatedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.delegated === true &&
        stuff.completed === false
      )
    })
    return delegatedStuffs.length.toString()
  }
  const delegatedStuffsTotal = gettingStuffsDelegated()

  function gettingStuffsProject() {
    const projectStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.project === true &&
        stuff.completed === false
      )
    })
    return projectStuffs.length.toString()
  }
  const projectStuffsTotal = gettingStuffsProject()

  function gettingStuffsIncubated() {
    const incubatedStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.incubate === true &&
        stuff.completed === false
      )
    })
    return incubatedStuffs.length.toString()
  }
  const incubatedStuffsTotal = gettingStuffsIncubated()

  function gettingStuffsReference() {
    const referenceStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.reference === true &&
        stuff.completed === false
      )
    })
    return referenceStuffs.length.toString()
  }
  const referenceStuffsTotal = gettingStuffsReference()

  function gettingStuffsTrash() {
    const trashStuffs = formattedStatusStuffDatabase.filter((stuff) => {
      return (
        stuff.discerned === true &&
        stuff.trash === true &&
        stuff.completed === false
      )
    })

    return trashStuffs.length.toString()
  }
  const trashStuffsTotal = gettingStuffsTrash()

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <User>
              <UserName>As listas</UserName>
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
          <ListCard
            type="fast"
            title="Ações Rápidas"
            amount={fastStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Context")
          }}
        >
          <ListCard
            type="context"
            title="Ações de Contexto"
            amount={contextStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DatedAction")
          }}
        >
          <ListCard
            type="date"
            title="Agenda"
            amount={datedActionStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Delegated")
          }}
        >
          <ListCard
            type="delegated"
            title="Ações Delegadas"
            amount={delegatedStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Project")
          }}
        >
          <ListCard
            type="project"
            title="Projetos"
            amount={projectStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Incubated")
          }}
        >
          <ListCard
            type="incubated"
            title="Incubadora"
            amount={incubatedStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reference")
          }}
        >
          <ListCard
            type="reference"
            title="Referências"
            amount={referenceStuffsTotal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Trash")
          }}
        >
          <ListCard type="trash" title="Lixeira" amount={trashStuffsTotal} />
        </TouchableOpacity>
      </HighlightCards>
    </Container>
  )
}

const ListingStack = createStackNavigator()

export function Listing() {
  const navigation = useNavigation<ListingScreenNavigationProps>()

  return (
    <ListingStack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
      <ListingStack.Screen
        name="The Lists"
        component={ListingScreen}
        options={{ headerShown: false }}
      />

      <ListingStack.Screen
        name="FastAction"
        component={FastAction}
        options={{
          title: "Ações Rápidas",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Context"
        component={Context}
        options={{
          title: "Ações de Contexto",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="DatedAction"
        component={DatedAction}
        options={{
          title: "Agenda",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Delegated"
        component={Delegated}
        options={{
          title: "Ações Delegadas",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Project"
        component={Project}
        options={{
          title: "Projetos",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Incubated"
        component={Incubated}
        options={{
          title: "Incubadora",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Reference"
        component={Reference}
        options={{
          title: "Referências",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />

      <ListingStack.Screen
        name="Trash"
        component={Trash}
        options={{
          title: "Lixeira",
          headerStyle: { backgroundColor: "#847577" },
          headerTintColor: "#ffffff",
        }}
      />
    </ListingStack.Navigator>
  )
}
