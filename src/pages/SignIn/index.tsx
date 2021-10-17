import React, { useState } from "react"
import { RFValue } from "react-native-responsive-fontsize"

import Logo from "../../assets/adaptive-icon.svg"
import GoogleSvg from "../../assets/google.svg"
import AppleSvg from "../../assets/apple.svg"

import { SignInSocialButton } from "../../component/SignInSocialButton"

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles"
import { useAuth } from "../../hooks/auth"
import { ActivityIndicator, Alert, Platform } from "react-native"
import { useTheme } from "styled-components"

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signWithGoogle, signWithApple } = useAuth()

  const theme = useTheme()

  async function handleSignWithGoogle() {
    try {
      setIsLoading(true)
      return await signWithGoogle()
    } catch (error) {
      console.log({ error })
      Alert.alert("Não foi possível conectar a conta Google!")
      setIsLoading(false)
    }
  }

  async function handleSignWithApple() {
    try {
      setIsLoading(true)
      return await signWithApple()
    } catch (error) {
      console.log({ error })
      Alert.alert("Não foi possível conectar a conta apple!")
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(220)} height={RFValue(150)} />
          <Title>
            Controle suas {"\n"}
            demandas de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login {"\n"} agora mesmo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Google Login"
            svg={GoogleSvg}
            onPress={handleSignWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Apple Login"
              svg={AppleSvg}
              onPress={handleSignWithApple}
            />
          )}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="large"
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  )
}
