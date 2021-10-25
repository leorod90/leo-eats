import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import Styles from "../../constants/Styles";
import HorizontalLine from "../../components/HorizontalLine";
import { useTheme } from "@react-navigation/native";

interface Props {
  data: any;
}

const ICON_SIZE = 24;

export default function DetailsJumbo({ data }: Props) {
  const { label, totalTime, calories, ingredients, dietLabels, servings } =
    data;
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.jumbo}>
        <CustomText style={styles.label} bold>
          {label}
        </CustomText>
        <HorizontalLine />
        <View style={styles.iconContain}>
          <View style={styles.iconInfo}>
            <Octicons
              name="clock"
              size={ICON_SIZE}
              color={colors.primary}
              style={styles.icon}
            />
            <CustomText>{totalTime} min</CustomText>
          </View>
          <View style={styles.iconInfo}>
            <Octicons
              name="flame"
              size={ICON_SIZE}
              color={colors.primary}
              style={styles.icon}
            />
            <CustomText>{Math.trunc(calories)} cal</CustomText>
          </View>
          <View style={styles.iconInfo}>
            <MaterialIcons
              name="person-outline"
              size={ICON_SIZE}
              color={colors.primary}
              style={styles.icon}
            />
            <CustomText>{servings} serv</CustomText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  jumbo: {
    // paddingHorizontal: Styles.screenPadding,
  },
  label: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: Styles.screenPadding,
  },
  iconContain: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    padding: Styles.screenPadding,
    paddingVertical: Styles.screenPadding,
  },
  iconInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Styles.screenPadding,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 5,
  },
});
