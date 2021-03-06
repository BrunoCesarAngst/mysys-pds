import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { Feather } from "@expo/vector-icons"
import { BorderlessButton } from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(100)}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 19px; */
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.colors.shape};
`

export const Form = styled.View`
  flex: 1;

  justify-content: space-between;
  width: 100%;

  padding: 23px;
`

export const Fields = styled.View`
  margin-top: ${RFValue(55)}px;
  flex: 1;

  /* justify-content: space-between; */
  width: 100%;

  padding: 23px;

  /* align-items: center; */
`

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
`

export const LogoutButton = styled(BorderlessButton)`
  right: ${RFValue(70)}px;
`
