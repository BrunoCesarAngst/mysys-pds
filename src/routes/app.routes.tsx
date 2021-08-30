import React from "react"
import { Platform } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import { Dashboard } from "../pages/Dashboard"
import { CollectStuff } from "../pages/CollectStuff"
import { useTheme } from "styled-components"
// const { Tab.Navigator, Tab.Screen } = createBottomTabNavigator()
const Tab = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text_light,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Inbox"
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
        component={CollectStuff}
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
      <Tab.Screen
        name="Run"
        component={CollectStuff}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="miscellaneous-services"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
