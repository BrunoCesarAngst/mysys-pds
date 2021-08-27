import styled from "styled-components/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 7px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 15px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};
`

export const Icon = styled(MaterialCommunityIcons)`
  font-size: ${RFValue(42)}px;
`

export const Footer = styled.View``

export const Amount = styled.Text`
  margin-top: 38px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme }) => theme.colors.text};
`

export const LastInput = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme }) => theme.colors.text_light};
`
