import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import firebaseConfig from "../../firebase/config";
import { db } from "../../firebase/utils";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "../navigation/bottomNav/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { customDefaultTheme, customDarkTheme } from "../constants/Colors";
import { rootState } from "../redux/store";
import { fetchData } from "../redux/dataActions";
import ErrorScreen from "../screens/ErrorScreen/ErrorScreen";
import { useFonts } from "expo-font";
import * as FileSystem from "expo-file-system";
import sh from "shorthash";

export default () => {
  const reduxData = useSelector((state: rootState) => state.dataReducer.data);
  const darkTheme = useSelector(
    (state: rootState) => state.appReducer.darkTheme
  );
  const [errorScreen, setErrorScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    "open-sans": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const cacheImage = async (uri: string) => {
    const name = sh.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log("image found");
      return image.uri;
    } else {
      console.log("downloading image to cache");
      const newImage = await FileSystem.downloadAsync(uri, path);
      return newImage.uri;
    }
  };

  const continueState = () => {
    setErrorScreen(false);
    setLoading(false);
  };

  const getFirebaseData = async () => {
    if (reduxData.length > 0) {
      continueState();
      return;
    } else {
      try {
        const data = await db.collection("Recipes").get();
        let results = data.docs.map((doc) => ({ ...doc.data(), key: doc.id }));
        results.forEach(async (doc: any) => {
          const uri = doc.image;
          doc.image = await cacheImage(uri);
        });
        if (results.length > 0) {
          dispatch(fetchData(results));
          continueState();
        } else {
          setErrorScreen(true);
          throw new Error("could not connect to db");
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  useEffect(() => {
    // storage
    //   .ref("salmon_teriyaki.jpeg")
    //   .getDownloadURL()
    //   .then((url) => {
    //     console.log(url);
    //   });
    getFirebaseData();
    // setLoading(false);
  }, []);

  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(firebaseConfig);
  }

  if (
    !fontsLoaded ||
    loading ||
    reduxData.length == 0 ||
    !firebase.apps.length
  ) {
    return null;
  }
  if (errorScreen) {
    return <ErrorScreen onPress={getFirebaseData} />;
  } else {
    return (
      <NavigationContainer
        theme={darkTheme ? customDarkTheme : customDefaultTheme}
      >
        <BottomNav />
      </NavigationContainer>
    );
  }
};
