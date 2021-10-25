import React from "react";
import { View } from "react-native";
import Styles from "../constants/Styles";
import CustomStatusBar from "./CustomStatusBar";
import CustomText from "./CustomText";

interface Props {
  title: string;
  spacing?: number;
}

export default function CustomHeader({ title, spacing }: Props) {
  return (
    <>
      <CustomStatusBar />
      <View
        style={{
          padding: spacing ? spacing : Styles.screenPadding,
        }}
      >
        <CustomText style={{ fontSize: Styles.fontSizeL }} bold>
          {title}
        </CustomText>
      </View>
    </>
  );
}
