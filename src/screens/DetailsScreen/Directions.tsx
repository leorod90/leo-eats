import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import Styles from "../../constants/Styles";

interface Props {
  data: any;
  TITLE_SIZE: number;
  SIZE: number;
}

export default function Directions({ data, TITLE_SIZE, SIZE }: Props) {
  const { directions } = data;
  return (
    <View>
      <CustomText style={[styles.directions, { fontSize: TITLE_SIZE }]} bold>
        Directions
      </CustomText>
      {directions.map((ing: string, i: number) => (
        <View style={styles.dir} key={i}>
          <CustomText style={{ fontSize: SIZE }}>
            {i + 1 + ". " + ing}
          </CustomText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  directions: {
    marginVertical: Styles.screenPadding,
  },
  dir: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: Styles.screenPadding / 2,
  },
});
