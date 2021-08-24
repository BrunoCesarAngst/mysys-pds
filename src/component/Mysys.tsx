import React from 'react';

import { Text, View } from 'react-native';

interface MysysProps {
  title: string;
}

export function Mysys({ title }: MysysProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}