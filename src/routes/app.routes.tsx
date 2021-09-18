import React from "react"
import { Platform } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import { Dashboard } from "../pages/Dashboard"
import { CollectStuff } from "../pages/CollectStuff"
import { useTheme } from "styled-components"
import { AppNavigatorParamsList } from "./types"
import { Listing } from "../pages/Listing"
const Tab = createBottomTabNavigator<AppNavigatorParamsList>()

export function AppRoutes() {
  const theme = useTheme()

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
