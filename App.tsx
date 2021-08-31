import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { LogBox, StatusBar } from "react-native"
import { ThemeProvider } from "styled-components"
import AppLoading from "expo-app-loading"
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"

import theme from "./src/global/style/theme"
import { AppRoutes } from "./src/routes/app.routes"

export default function App() {
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
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
