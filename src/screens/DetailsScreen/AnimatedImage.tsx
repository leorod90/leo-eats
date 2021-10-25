import React from "react";
import { SharedElement } from "react-navigation-shared-element";
import { Image, Platform } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Styles from "../../constants/Styles";

const IMAGE_HEIGHT = Styles.WIDTH - 100;

interface Props {
  label: string;
  image: string;
  translationY: any;
}

export default function AnimatedImage({ label, image, translationY }: Props) {
  const inputRange = [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT, IMAGE_HEIGHT + 1];
  const rStyle = useAnimatedStyle(() => {
    // const translateY = interpolate(
    //   translationY.value,
    //   inputRange,
    //   [0, 1, 0],
    //   Extrapolate.CLAMP
    // );
    const translateY = translationY.value;
    const platformScale = Platform.OS === "ios" ? 1.1 : 1;
    const scale = interpolate(
      translationY.value,
      inputRange,
      [2, platformScale, 0.95],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY,
        },
        { scale },
      ],
    };
  });
  return (
    <Animated.View style={rStyle}>
      <SharedElement id={label}>
        <Image
          source={{ uri: image }}
          style={[
            {
              width: Styles.WIDTH,
              height: IMAGE_HEIGHT,
            },
          ]}
          resizeMode="cover"
        />
      </SharedElement>
    </Animated.View>
  );
}
