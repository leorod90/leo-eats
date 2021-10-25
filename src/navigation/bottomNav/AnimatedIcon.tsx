import React, { useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import { colorScheme } from "../../constants/Colors";
import Styles from "../../constants/Styles";

type Prop = {
  item: {
    icon: string;
    screen: string;
  };
  onPress: any;
  active: boolean;
};

export default function AnimatedIcon({ item, onPress, active }: Prop) {
  const { icon } = item;
  const { colors } = useTheme();
  const show = useSharedValue<boolean>(active);

  useEffect(() => {
    show.value = active;
  }, [active]);

  const derived = useDerivedValue(() => show.value, []);

  const offStyle = useAnimatedStyle(() => {
    const scale = interpolate(derived.value, [true, false], [0, 1]);
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  }, []);

  const activeStyle = useAnimatedStyle(() => {
    const scale = interpolate(derived.value, [false, true], [0, 1]);
    return {
      transform: [
        {
          scale: withSpring(scale),
        },
      ],
    };
  }, []);

  return (
    <Pressable style={({ pressed }) => [styles.barItem]} onPress={onPress}>
      <Animated.View style={[styles.current, offStyle]}>
        <Ionicons
          name={icon + "-outline"}
          size={Styles.bottomIconSize}
          color={colorScheme.gray}
        />
      </Animated.View>
      <Animated.View style={[styles.current, activeStyle]}>
        <Ionicons
          name={icon}
          size={Styles.bottomIconSize}
          color={colors.primary}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  current: {
    position: "absolute",
  },
});
