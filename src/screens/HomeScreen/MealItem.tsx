import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import CustomText from "../../components/CustomText";
import { colorScheme } from "../../constants/Colors";
import Styles from "../../constants/Styles";
import { CATEGORY } from "../../data/Categories";

interface Props extends CATEGORY {
  active: boolean;
  MEAL_SIZE: number;
  MEAL_MARGIN: number;
}

export default function MealItem({
  name,
  image,
  active,
  MEAL_SIZE,
  MEAL_MARGIN,
}: Props) {
  const colors = active
    ? ["rgba(0,0,0,0)", "rgba(0,0,0,.3)"]
    : ["rgba(150,150,150,.7)", "rgba(150,150,150,.7)", "rgba(100,100,100,.7)"];
  return (
    <View style={[styles.shadow, { marginRight: MEAL_MARGIN }]}>
      <ImageBackground
        source={image}
        style={[
          styles.image,
          {
            width: MEAL_SIZE,
            height: MEAL_SIZE,
          },
        ]}
        resizeMode="cover"
      >
        <LinearGradient colors={colors} style={styles.background}>
          <CustomText bold style={styles.text}>
            {name}
          </CustomText>
        </LinearGradient>
      </ImageBackground>
      {/* {!active && <View style={styles.notSelected} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...Styles.shadow,
  },
  container: {
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    overflow: "hidden",
    borderRadius: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
    padding: 5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  text: {
    fontSize: Styles.fontSizeS,
    color: colorScheme.white,
  },
  notSelected: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,255,.7)",
    borderRadius: 10,
  },
});
