import React, { useEffect } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { CategoriesProps } from "../../navigation/categoriesNav/CategoriesNav";
import { FavNavProps } from "../../navigation/favNav/FavNav";
import { HomeNavProps } from "../../navigation/homeNav/HomeNav";
import AnimatedHeader from "./AnimatedHeader";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AnimatedImage from "./AnimatedImage";
import DetailsJumbo from "./DetailsJumbo";
import Styles from "../../constants/Styles";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import Nutrition from "./Nutrition";
import { useTheme } from "@react-navigation/native";

const BORDER = 50;
const TITLE_SIZE = 18;
const SIZE = 14;

export default function DetailsScreen({
  route,
  navigation,
}:
  | HomeNavProps<"Details">
  | CategoriesProps<"Details">
  | FavNavProps<"Details">) {
  const { colors } = useTheme();
  const { data } = route.params;
  const { label, image, key } = data;
  const translationY = useSharedValue(0);
  const DetailY = useSharedValue(0);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      DetailY.value = withTiming(1, {
        duration: 750,
        easing: Easing.out(Easing.exp),
      });
    }, 550);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const rStyle = useAnimatedStyle(() => ({ opacity: DetailY.value }));
  const vStyle = useAnimatedStyle(() => ({ opacity: DetailY.value }));

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <AnimatedHeader
        translationY={translationY}
        label={label}
        itemKey={key}
        onPress={() => navigation.goBack()}
      />
      <Animated.ScrollView
        contentContainerStyle={styles.scroll}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.imageContainer}>
          <AnimatedImage
            label={label}
            image={image}
            translationY={translationY}
          />
        </View>
        <Animated.View
          style={[
            styles.detailContainer,
            rStyle,
            // { backgroundColor: colors.background },
          ]}
        >
          <DetailsJumbo data={data} />
          <Ingredients data={data} TITLE_SIZE={TITLE_SIZE} SIZE={SIZE} />
          <Directions data={data} TITLE_SIZE={TITLE_SIZE} SIZE={SIZE} />
          <Nutrition data={data} TITLE_SIZE={TITLE_SIZE} SIZE={SIZE} />
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  imageContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  detailContainer: {
    width: "100%",
    // borderTopLeftRadius: BORDER,
    // borderTopRightRadius: BORDER,
    padding: Styles.screenPadding,
    paddingBottom: Styles.bottomTabHeight / 2,
  },
});
