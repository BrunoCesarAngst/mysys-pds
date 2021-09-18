import "react-native-gesture-handler"
import "intl"
import "intl/locale-data/jsonp/pt-BR"

import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "styled-components"
import AppLoading from "expo-app-loading"
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"

import theme from "./src/global/style/theme"
import { SignIn } from "./src/pages/SignIn"
import { AuthProvider } from "./src/hooks/auth"
import { AppRoutes } from "./src/routes/app.routes"
import { Home } from "./src/pages/Home"

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
        {/* <AuthProvider>
          <SignIn />
        </AuthProvider> */}
      </NavigationContainer>
    </ThemeProvider>
  )
}
