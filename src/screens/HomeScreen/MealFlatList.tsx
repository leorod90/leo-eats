import React, { useRef } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import { MEALS } from "../../data/Categories";
import Styles from "../../constants/Styles";
import MealItem from "./MealItem";

interface Props {
  mealIndex: number;
  setMealIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MEAL_SIZE = Styles.mealSize;
const MEAL_MARGIN = 15;

export default function MealFlatList({ mealIndex, setMealIndex }: Props) {
  const mealRef = useRef<any>(null);

  const scrollToIndexHandler = (index: number) => {
    let itemWidth = MEAL_SIZE + MEAL_MARGIN;
    let offset = index * itemWidth;
    let time = Platform.OS === "android" ? 750 : 250;
    // setTimeout(() => {
    //   mealRef.current.scrollToOffset({
    //     offset,
    //     animated: true,
    //   });
    // }, time);
  };

  return (
    <FlatList
      data={MEALS}
      ref={mealRef}
      scrollEventThrottle={16}
      onMomentumScrollEnd={() =>
        setTimeout(() => {
          scrollToIndexHandler(mealIndex);
        }, 750)
      }
      decelerationRate={0}
      contentContainerStyle={styles.mealFlat}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => {
        const active = mealIndex === index;
        return (
          <TouchableOpacity
            onPress={() => {
              setMealIndex(index);
              scrollToIndexHandler(index);
            }}
          >
            <MealItem
              name={item.name}
              image={item.image}
              active={active}
              MEAL_SIZE={MEAL_SIZE}
              MEAL_MARGIN={MEAL_MARGIN}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  mealFlat: {
    padding: Styles.screenPadding,
    paddingRight: 0,
  },
});
