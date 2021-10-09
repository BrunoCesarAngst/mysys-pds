import React from "react"
import { Platform } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import { Dashboard } from "../pages/Dashboard"
import { CollectStuff } from "../pages/CollectStuff"
import { useTheme } from "styled-components"
import { AppNavigatorParamsList } from "./types"
import { Listing } from "../pages/Listing"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation, useRoute } from "@react-navigation/core"
const Tab = createBottomTabNavigator<AppNavigatorParamsList>()

type RoutesNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Routes"
>

export function AppRoutes() {
  const theme = useTheme()

  const navigation = useNavigation<RoutesNavigationProps>()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text_light,
        tabBarLabelPosition: "beside-icon",
        tabBarItemStyle: {},
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Collect"
        component={CollectStuff}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="playlist-add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Listing"
        component={Listing}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-numbered"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
