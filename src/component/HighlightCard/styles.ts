import styled, { css } from "styled-components/native"
import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize"

interface TypeProps {
  type: "input" | "demand" | "done"
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === "done" ? theme.colors.success : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 7px;

  padding: 9px 19px;
  padding-bottom: ${RFValue(31)}px;
  margin-right: 15px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === "done" ? theme.colors.shape : theme.colors.text};
`

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(35)}px;

  ${({ type }) =>
    type === "input" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === "demand" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ type }) =>
    type === "done" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`

export const Footer = styled.View``

export const Amount = styled.Text<TypeProps>`
  margin-top: 7px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === "done" ? theme.colors.shape : theme.colors.text};
`

export const LastInput = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === "done" ? theme.colors.shape : theme.colors.text_light};
`
