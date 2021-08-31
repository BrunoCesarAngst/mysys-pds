import React from "react"

import { Button, Image, Text, View } from "react-native"

import { Container } from "./styles"

export function Welcome() {
  return (
    <Container>
      {/* <Image source={require("../assets/mySys-2.png")} /> */}
      <Text>Welcome to the mySys</Text>

      <View>
        <Button title='Login' onPress={() => {}}/>
        <Button title='Register' onPress={() => {}}/>
      </View>

    </Container>
  )
}
