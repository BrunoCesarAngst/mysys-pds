import "react-native-gesture-handler"
import "intl"
import "intl/locale-data/jsonp/pt-BR"

import React from "react"

import { LogBox } from "react-native"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"

import { OrientationLock } from "expo-screen-orientation"
import { useScreenOrientationLock } from "@use-expo/screen-orientation"

import { Routes } from "./src/routes"

import { ThemeProvider } from "styled-components"
import AppLoading from "expo-app-loading"
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"

import theme from "./src/global/style/theme"
import { AuthProvider, useAuth } from "./src/hooks/auth"

const themePaper = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#619b8a",
    accent: "#ed6a5a",
  },
}

export default function App() {
  LogBox.ignoreLogs([
    "Setting a timer for a long period of time",
    "@firebase/firestore:, Firestore (8.2.2): Connection, WebChannel transport errored:, he",
    "Firebase Analytics is not available in the Expo client",
  ])

  try {
    const [lockInfo, lockError] = useScreenOrientationLock(
      OrientationLock.PORTRAIT
    )
  } catch (error) {
    console.log("Error in useScreenOrientationLock", error)
  }

  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  const { userStorageLoading } = useAuth()

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <PaperProvider theme={themePaper}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}
