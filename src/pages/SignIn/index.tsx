import React, { useContext } from "react"
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

export function SignIn() {
  const { user } = useAuth()
  console.log(user)

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
        <SignInTitle>
          Faça seu login com {"\n"} uma das contas a baixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Google Login" svg={GoogleSvg} />
          <SignInSocialButton title="Apple Login" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
