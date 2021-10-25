import React, { useRef, MutableRefObject, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";

interface Props {
  onPress: () => void;
}

export default function LottieScreen({ onPress }: Props) {
  const animation = useRef() as MutableRefObject<any>;

  const splash = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    splash();
  }, []);

  return (
    <View style={styles.contain}>
      <LottieView
        ref={animation}
        style={styles.lottie}
        source={require("../../../assets/json/error.json")}
        autoPlay={true}
        loop={true}
        speed={0.5}
      />
      <View>
        <Text style={{ fontSize: 18 }}>Could not connect to internet</Text>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text style={styles.txt}>TRY AGAIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  lottie: {
    width: 300,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#f53939",
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  txt: {
    color: "white",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 22,
  },
});
