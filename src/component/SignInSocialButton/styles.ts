import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

export const Button = styled(RectButton)`
  height: ${RFValue(57)}px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 7px;

  align-items: center;
  flex-direction: row;

  margin-bottom: 17px;
`

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(17)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`
