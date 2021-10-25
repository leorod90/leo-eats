import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Styles from "../../constants/Styles";

interface Props {
  index: number;
  children: React.ReactNode;
  even: boolean;
}

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

export default function AnimatedWrapper({ index, children, even }: Props) {
  let row = Math.ceil((index + 1) / 2) - 1;
  const transitionY = useSharedValue(Styles.cardHeight + Styles.screenPadding);
  let left = even ? 0 : 1;
  const transitionX = useSharedValue(Styles.cardWidth + Styles.screenPadding);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(transitionY.value * row, SPRING_CONFIG),
        },
        {
          translateX: withSpring(transitionX.value * left, SPRING_CONFIG),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.style, rStyle]}>{children}</Animated.View>
  );
}

const styles = StyleSheet.create({
  style: {
    position: "absolute",
  },
});
