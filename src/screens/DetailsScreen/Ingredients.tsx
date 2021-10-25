import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import Styles from "../../constants/Styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";

interface Props {
  data: any;
  TITLE_SIZE: number;
  SIZE: number;
}

export default function Ingredients({ data, TITLE_SIZE, SIZE }: Props) {
  const { ingredients } = data;
  const { colors } = useTheme();
  const [isChecked, setIsChecked] = React.useState(() =>
    ingredients.map(() => false)
  );
  const handleClick = (index: number) => {
    // const index = parseInt(i, 10);
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    setIsChecked(newIsChecked);
  };

  return (
    <View>
      <CustomText style={[styles.ingredients, { fontSize: TITLE_SIZE }]} bold>
        Ingredients
      </CustomText>
      {ingredients.map((ing: string, i: number) => {
        const line = isChecked[i]
          ? {
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
            }
          : {};

        return (
          <View style={styles.ing} key={i}>
            <BouncyCheckbox
              bounceFriction={10}
              size={TITLE_SIZE}
              fillColor={colors.primary}
              // unfillColor="green"
              iconStyle={{ borderColor: colors.primary }}
              isChecked={isChecked[i]}
              onPress={() => handleClick(i)}
            />
            <CustomText style={{ fontSize: SIZE, ...line }}>{ing}</CustomText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ingredients: {
    marginBottom: Styles.screenPadding,
  },
  ing: {
    paddingRight: Styles.screenPadding,
    flexDirection: "row",
    alignContent: "center",
    marginBottom: Styles.screenPadding / 2,
  },
});
