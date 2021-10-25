import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

interface Props {
  bold?: boolean;
  style?: any;
  numberOfLines?: number;
  children: React.ReactNode;
}

export default function CustomText({
  bold,
  style,
  children,
  numberOfLines,
}: Props) {
  const { colors } = useTheme();
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: bold ? "open-sans-bold" : "open-sans",
          color: colors.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
