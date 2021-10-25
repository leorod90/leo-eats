import React from "react";
import { View, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { rootState } from "../redux/store";
import { StatusBar } from "expo-status-bar";
import Styles from "../constants/Styles";

interface Props {
  disable?: boolean;
}

export default function CustomStatusBar({ disable }: Props) {
  const darkTheme = useSelector(
    (state: rootState) => state.appReducer.darkTheme
  );
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: getStatusBarHeight(true),
        paddingTop: Styles.screenPadding,
        width: "100%",
      }}
    >
      {!disable && Platform.OS === "ios" ? (
        <StatusBar style={darkTheme ? "light" : "dark"} />
      ) : (
        <StatusBar
          backgroundColor={colors.background}
          animated
          style={darkTheme ? "light" : "dark"}
        />
      )}
    </View>
  );
}
