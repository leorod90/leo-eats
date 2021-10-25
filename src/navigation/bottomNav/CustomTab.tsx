import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import Styles from "../../constants/Styles";
import AnimatedIcon from "./AnimatedIcon";
import Animated, {
  useSharedValue,
  withTiming,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { customDarkTheme, customDefaultTheme } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";

const BOTTOM_WIDTH = Styles.WIDTH;

const LIST = [
  {
    id: "home",
    icon: "fast-food",
    screen: "HomeNav",
    topScreen: "Home",
  },
  {
    id: "categories",
    icon: "grid",
    screen: "CategoriesNav",
    topScreen: "Cuisines",
  },
  {
    id: "favorites",
    icon: "heart",
    screen: "FavNav",
    topScreen: "Favorites",
  },
  {
    id: "settings",
    icon: "settings",
    screen: "Settings",
    topScreen: null,
  },
];

const lineSize = "12.5%";
// const linePosition = 32 * .875;
const linePosition = (BOTTOM_WIDTH / LIST.length) * (1 / LIST.length);

export default function CustomTab({ navigation, state }: BottomTabBarProps) {
  const { index } = state;
  const { colors } = useTheme();
  const barPosition = (index * BOTTOM_WIDTH) / LIST.length;
  const x = useSharedValue(barPosition);

  const darkTheme = useSelector(
    (state: rootState) => state.appReducer.darkTheme
  );

  const progress = useDerivedValue(
    () => (darkTheme ? withTiming(1) : withTiming(0)),
    [darkTheme]
  );

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [customDefaultTheme.colors.background, customDarkTheme.colors.background]
    );

    return { backgroundColor };
  });

  useEffect(() => {
    x.value = barPosition;
  }, [index]);

  const translateX = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(x.value, {
            duration: 300,
          }),
        },
      ],
    }),
    [index]
  );
  return (
    <Animated.View style={rStyle}>
      <View style={[styles.container]}>
        {LIST.map((item, i) => {
          return (
            <AnimatedIcon
              key={item.id}
              item={item}
              active={index == i}
              onPress={() => {
                // navigation.navigate(item.screen);
                navigation.navigate(item.screen, { screen: item.topScreen });
              }}
            />
          );
        })}
        <Animated.View
          style={[
            styles.line,
            { borderBottomColor: colors.primary },
            translateX,
          ]}
        />
      </View>
      <SafeAreaView />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    height: Styles.bottomTabHeight,
    width: BOTTOM_WIDTH,
    bottom: 0,
  },
  line: {
    position: "absolute",
    width: lineSize,
    left: linePosition,
    alignSelf: "center",
    bottom: 0,
    borderRadius: 50,
    borderBottomWidth: 5,
  },
});
