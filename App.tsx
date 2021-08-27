import React from "react"
import { LogBox } from "react-native"
import { ThemeProvider } from "styled-components"
import AppLoading from "expo-app-loading"
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"

import theme from "./src/global/style/theme"
import { Dashboard } from "./src/pages/Dashboard"
import { Login } from "./src/pages/Login"
// import { Home } from "./src/pages/Home"
// import { Welcome } from "./src/pages/Welcome"

export default function App() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"])

  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}
