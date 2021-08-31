import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { CollectStuff } from "../pages/CollectStuff"

const Stack = createStackNavigator()

export function AddStuffStack() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Collect" component={CollectStuff} />
    </Stack.Navigator>
  )
}
