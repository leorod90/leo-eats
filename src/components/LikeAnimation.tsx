import React, { useEffect, useRef, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { toggleFavorite } from "../redux/dataActions";
import { rootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";

interface Props {
  size: number;
  itemKey: string;
  homeAnim?: boolean;
}

export default function LikeAnimation({ size, itemKey, homeAnim }: Props) {
  const animation = useRef<any>();
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();

  const favorites = useSelector(
    (state: rootState) => state.dataReducer.favorites
  );
  const liked = favorites.some((item: any) => item.key === itemKey);

  useEffect(() => {
    if (pressed) {
      if (liked) {
        animation.current.play(0, 25);
        setPressed(false);
      } else {
        animation.current.play(7, 0);
        setPressed(false);
      }
    } else if (liked) {
      animation.current.play(25, 25);
      setPressed(false);
    } else {
      animation.current.play(0, 0);
      setPressed(false);
    }
    if (homeAnim) {
      navigation.addListener("focus", () => {
        setPressed(false);
      });
    }
  }, [liked]);

  const onPressHandler = () => {
    setPressed(true);
    dispatch(toggleFavorite(itemKey));
  };

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View
        style={{
          width: size,
          height: size,
        }}
      >
        <LottieView
          ref={animation}
          style={{ backgroundColor: "transparent" }}
          source={require("../../assets/json/heart.json")}
          autoPlay={false}
          loop={false}
          speed={1}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
