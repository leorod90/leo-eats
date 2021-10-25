import React, { useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import CustomStatusBar from "../../components/CustomStatusBar";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../../constants/Styles";
import LikeAnimation from "../../components/LikeAnimation";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useSharedValue,
  withTiming,
  Easing,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { colorScheme } from "../../constants/Colors";

const ICON_SIZE = 24;

interface Props {
  translationY: any;
  label: string;
  itemKey: string;
  onPress: () => void;
}

const IMAGE_HEIGHT = Styles.WIDTH - 100;

export default function AnimatedHeader({
  translationY,
  label,
  itemKey,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const opacityV = useSharedValue(0);

  const inputRange = [0, IMAGE_HEIGHT - 100];

  useEffect(() => {
    let timer1 = setTimeout(() => {
      opacityV.value = withTiming(1, {
        duration: 750,
        easing: Easing.out(Easing.exp),
      });
    }, 550);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(translationY.value, inputRange, [
      "transparent",
      colors.background,
    ]);
    const opacity = opacityV.value;

    return { backgroundColor, opacity };
  });

  const iStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(translationY.value, inputRange, [
      colorScheme.splash,
      "transparent",
      Extrapolate.CLAMP,
    ]);

    return { backgroundColor };
  });
  const i2Style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(translationY.value, inputRange, [
      colorScheme.splash,
      "transparent",
      Extrapolate.CLAMP,
    ]);

    return { backgroundColor };
  });

  const tStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [IMAGE_HEIGHT - 80, IMAGE_HEIGHT - 50],
      [0, 1],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      translationY.value,
      [IMAGE_HEIGHT - 60, IMAGE_HEIGHT - 15],
      [70, 0],
      Extrapolate.CLAMP
    );

    return {
      //opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <CustomStatusBar />
      <View style={styles.iconHeader}>
        <Animated.View style={[styles.iconContain, iStyle]}>
          <Ionicons
            name="chevron-back"
            size={ICON_SIZE * 1.1}
            color="#ccc"
            onPress={onPress}
          />
        </Animated.View>
        <Animated.Text
          style={[
            styles.label,
            tStyle,
            {
              color: colors.text,
            },
          ]}
        >
          {label}
        </Animated.Text>
        <Animated.View style={[styles.iconContain, i2Style]}>
          <LikeAnimation itemKey={itemKey} size={ICON_SIZE * 2} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 10,
  },
  iconHeader: {
    flexDirection: "row",
    padding: Styles.screenPadding,
    paddingVertical: Platform.OS === "android" ? undefined : 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContain: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});
