import styled from "styled-components/native"
import { Feather } from "@expo/vector-icons"
import { FlatList } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(13)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(17)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const User = styled.View`
  margin-left: 17px;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
  vertical: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingVertical: 24 },
})`
  width: 100%;

  padding: 8px;

  position: absolute;

  margin-top: ${RFPercentage(6)}px;
`
