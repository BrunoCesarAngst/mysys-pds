import React from "react"
import { SafeAreaView } from "react-native"
import { Appbar } from "react-native-paper"

export const HeaderComponent = (props: HeaderComponentProps) => {
  return (
    <SafeAreaView>
      <Appbar>
        <Appbar.BackAction />
        <Appbar.Content title={props.title} />
      </Appbar>
    </SafeAreaView>
  )
}

interface HeaderComponentProps {
  title: string
}
