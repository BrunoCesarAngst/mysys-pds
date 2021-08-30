import styled from "styled-components/native"
import { TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.secondary};

  width: 100%;

  border-radius: 7px;

  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: 19px;
`
