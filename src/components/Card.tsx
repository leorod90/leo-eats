import React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { SharedElement } from "react-navigation-shared-element";
import Styles from "../constants/Styles";
import LikeAnimation from "./LikeAnimation";
import { Octicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface Props {
  label: string;
  image: any;
  totalTime: string;
  itemKey: string;
  home?: boolean;
  onPress: () => void;
  RESULT_WIDTH?: number;
}

export default function ResultsItem({
  label,
  image,
  totalTime,
  onPress,
  home,
  itemKey,
  RESULT_WIDTH,
}: Props) {
  const width = RESULT_WIDTH ? RESULT_WIDTH : Styles.cardWidth;
  const marginBottom = RESULT_WIDTH ? undefined : Styles.screenPadding;
  const { colors } = useTheme();
  let homeAnim = home ? home : false;
  const BIG_SIZE = width * 0.09;
  const SIZE = width * 0.07;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          width,
          height: width * 1.6,
          marginBottom,
        },
      ]}
    >
      <SharedElement id={label}>
        <Image source={{ uri: image }} style={styles.image} />
      </SharedElement>
      <View style={styles.info}>
        <CustomText
          style={[styles.label, { fontSize: BIG_SIZE }]}
          bold
          numberOfLines={2}
        >
          {label}
        </CustomText>
        <View style={styles.bottomInfo}>
          <CustomText style={[styles.text, , { fontSize: SIZE }]}>
            <Octicons name="clock" size={SIZE} color={colors.text} />
            {` ${totalTime}`} min
          </CustomText>
          <LikeAnimation
            homeAnim={homeAnim}
            itemKey={itemKey}
            size={BIG_SIZE * 3}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
    aspectRatio: 2 / 2,
  },
  info: {
    flex: 1,
    // backgroundColor: "red",
    overflow: "hidden",
    paddingHorizontal: Styles.screenPadding * 0.75,
    justifyContent: "space-between",
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    paddingTop: Styles.screenPadding * 0.75,
    // fontSize: 12,
  },
  text: {
    // fontSize: 12,
  },
});
