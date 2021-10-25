import React from "react";
import { View } from "react-native";
import Styles from "../../constants/Styles";
import CustomStatusBar from "../../components/CustomStatusBar";
import CustomText from "../../components/CustomText";

export default function CustomHomeHeader() {
  return (
    <>
      <CustomStatusBar />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: Styles.screenPadding,
          paddingBottom: 0,
        }}
      >
        <CustomText style={{ fontSize: Styles.fontSizeL }} bold>
          Welcome
        </CustomText>
      </View>
    </>
  );
}
