import styled, { css } from "styled-components/native"
import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize"

interface TypeProps {
  type:
    | "fast"
    | "trash"
    | "incubated"
    | "reference"
    | "delegated"
    | "project"
    | "context"
    | "date"
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === "fast" ? theme.colors.success : theme.colors.shape};

  width: ${RFValue(340)}px;
  border-radius: 7px;

  padding: 16px;
  /* padding-bottom: ${RFValue(31)}px; */
  margin: 5px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;

  color: ${({ theme, type }) =>
    type === "fast" ? theme.colors.shape : theme.colors.text};
`

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;

  ${({ type }) =>
    type === "fast" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}

  ${({ type }) =>
    type === "trash" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ type }) =>
    type === "project" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}
`

export const Amount = styled.Text<TypeProps>`
  margin-top: 7px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === "fast" ? theme.colors.shape : theme.colors.text};
`
