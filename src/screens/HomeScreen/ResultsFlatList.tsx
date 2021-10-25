import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import Styles from "../../constants/Styles";
import Card from "../../components/Card";

const { width } = Dimensions.get("window");

interface Props {
  navigate: any;
  data: any;
}

export default function ResultsFlatList({ navigate, data }: Props) {
  const [resultWith, setResultWith] = useState(Styles.WIDTH * 0.55);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (width > 750) {
      setResultWith(300);
    }
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    const inputRange = [
      (index - 1) * resultWith,
      index * resultWith,
      (index + 1) * resultWith,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.825, 1.0, 0.7],
      extrapolate: "clamp",
    });

    const { label, image, totalTime, key } = item;

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        <Card
          label={label}
          image={image}
          totalTime={totalTime}
          itemKey={key}
          home={true}
          onPress={() => navigate("Details", { data: item })}
          RESULT_WIDTH={resultWith}
        />
      </Animated.View>
    );
  }, []);

  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={[
        styles.resultsFlat,
        // { paddingRight: resultWith - Styles.screenPadding * 3 }
        { paddingRight: width - resultWith - Styles.screenPadding },
      ]}
      horizontal
      alwaysBounceHorizontal={false}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => "key" + String(index)}
      snapToInterval={resultWith}
      decelerationRate={0}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      maxToRenderPerBatch={5}
      windowSize={5}
      // renderItem={({ item, index }) => {
      //   const inputRange = [
      //     (index - 1) * resultWith,
      //     index * resultWith,
      //     (index + 1) * resultWith,
      //   ];

      //   const scale = scrollX.interpolate({
      //     inputRange,
      //     outputRange: [0.825, 1.0, 0.7],
      //     extrapolate: "clamp",
      //   });

      //   const { label, image, totalTime, key } = item;

      //   return (
      //     <Animated.View
      //       style={{
      //         transform: [{ scale }],
      //       }}
      //     >
      //       <Card
      //         label={label}
      //         image={image}
      //         totalTime={totalTime}
      //         itemKey={key}
      //         home={true}
      //         onPress={() => navigate("Details", { data: item })}
      //         RESULT_WIDTH={resultWith}
      //       />
      //     </Animated.View>
      //   );
      // }}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  resultsFlat: {
    alignItems: "center",
    paddingHorizontal: Styles.screenPadding,
    paddingVertical:
      width > 750 ? Styles.screenPadding / 2 : Styles.screenPadding,
  },
});
