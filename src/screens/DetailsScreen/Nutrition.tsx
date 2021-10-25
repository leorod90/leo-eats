import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import Styles from "../../constants/Styles";

interface Props {
  data: any;
  TITLE_SIZE: number;
  SIZE: number;
}

export default function Nutrition({ data, TITLE_SIZE, SIZE }: Props) {
  const { protein, carbs, fat } = data.nutrition;
  return (
    <View>
      <CustomText style={[styles.nutrition, { fontSize: TITLE_SIZE }]} bold>
        Nutrition
      </CustomText>

      <View style={styles.nutritionContain}>
        <CustomText style={{ fontSize: SIZE }}>Protein {protein}g</CustomText>
        <CustomText style={{ fontSize: SIZE }}>Carbs {carbs}g</CustomText>
        <CustomText style={{ fontSize: SIZE }}>Fat {fat}g</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nutrition: {
    marginVertical: Styles.screenPadding,
  },
  nutritionContain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Styles.screenPadding,
  },
});
