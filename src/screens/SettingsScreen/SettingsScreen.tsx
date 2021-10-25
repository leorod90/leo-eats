import React, { useState } from "react";
import { StyleSheet, View, Switch } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import CustomText from "../../components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import { switchTheme } from "../../redux/appActions";
import { useTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { customDarkTheme, customDefaultTheme } from "../../constants/Colors";
import Styles from "../../constants/Styles";

export default function SettingScreen({}) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme();

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

  const changeThemeHandler = () => {
    setDisabled(true);
    dispatch(switchTheme());

    setTimeout(() => {
      setDisabled(false);
    }, 500);
  };

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <CustomHeader title="Settings" />
      <View style={styles.settingContainer}>
        <View style={styles.theme}>
          <CustomText style={styles.txt}>Dark Mode</CustomText>
          <Switch
            disabled={disabled}
            value={darkTheme}
            onValueChange={changeThemeHandler}
            trackColor={{ false: colors.text, true: colors.primary }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingContainer: {
    padding: Styles.screenPadding,
  },
  theme: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontSize: 22,
    marginRight: Styles.screenPadding * 2,
  },
});
