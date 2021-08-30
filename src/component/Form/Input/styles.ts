import styled from "styled-components/native"
import { TextInput } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled(TextInput)`
  width: 100%;
  padding: 15px 17px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 7px;

  margin-bottom: 7px;
`
