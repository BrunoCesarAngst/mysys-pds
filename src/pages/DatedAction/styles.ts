import styled from "styled-components/native"
import { Feather } from "@expo/vector-icons"
import { FlatList } from "react-native"
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { DataInboxList } from "."
import { BorderlessButton } from "react-native-gesture-handler"

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(8)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`
export const Inbox = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(4)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const InboxList = styled(
  FlatList as new () => FlatList<DataInboxList>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
