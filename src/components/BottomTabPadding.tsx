import React from "react";
import { View } from "react-native";
import Styles from "../constants/Styles";

interface Props {
  small?: boolean;
}

export default function BottomTabPadding({ small }: Props) {
  const PADDING = Styles.bottomTabHeight;
  return (
    <View
      style={{ height: small ? PADDING / 4 : PADDING / 2, width: Styles.WIDTH }}
    />
  );
}
