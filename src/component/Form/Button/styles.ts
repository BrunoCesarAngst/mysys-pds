import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"

interface typeProp {
  type: "cancel" | "edit"
}

export const Container = styled(RectButton)<typeProp>`
  background-color: ${({ theme, type }) =>
    type === "cancel" ? theme.colors.attention : theme.colors.secondary};

  width: 100%;

  border-radius: 7px;

  align-items: center;
  margin: ${RFValue(4)}px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: 19px;
`
