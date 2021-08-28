import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

interface InboxPropsType {
  type: "inAdvance" | "late"
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 7px;

  padding: 15px 20px;

  margin-bottom: 10px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 9px;
`

export const Title = styled.Text<InboxPropsType>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === "inAdvance" ? theme.colors.success : theme.colors.attention};
`

export const Date = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  text-align: right;
`

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(10)}px;
`
