import React from "react";
import { TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import CustomText from "../../components/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../../constants/Styles";
import { CATEGORY } from "../../data/Categories";
import { colorScheme } from "../../constants/Colors";
import { useTheme } from "@react-navigation/native";

interface Props extends CATEGORY {
  spacing: number;
  onPress: () => void;
}

export default function Cuisines({ name, image, spacing, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shadow,
        { backgroundColor: colors.background, margin: spacing },
      ]}
    >
      <ImageBackground
        source={image}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,.5)"]}
          style={styles.background}
        >
          <CustomText bold style={styles.text}>
            {name}
          </CustomText>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    width: Styles.categoryWidth,
    height: Styles.categoryHeight,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.27,

    elevation: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 5,
  },
  background: {
    flex: 1 / 2,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 18,
    color: colorScheme.white,
  },
});
