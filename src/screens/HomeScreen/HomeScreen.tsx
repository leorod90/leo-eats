import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { HomeNavProps } from "../../navigation/homeNav/HomeNav";
import Styles from "../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import CustomHomeHeader from "./CustomHomeHeader";
import MealFlatList from "./MealFlatList";
import ResultsFlatList from "./ResultsFlatList";
import { useTheme } from "@react-navigation/native";
import { colorScheme } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import { MEALS } from "../../data/Categories";
import * as SplashScreen from "expo-splash-screen";

const SEARCH_SIZE = Styles.fontSizeM;

export default function HomeScreen({
  route,
  navigation,
}: HomeNavProps<"Home">) {
  const [text, onChangeText] = useState("");
  const [mealIndex, setMealIndex] = useState(0);

  const { colors } = useTheme();
  const data = useSelector((state: rootState) => state.dataReducer.data);
  const [searchData, setSearchData] = useState(data);

  const splash = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    let newData = data;

    if (mealIndex !== 0) {
      newData = data.filter((data: any) => data.meal == MEALS[mealIndex].name);
    }
    if (text.trim() !== "") {
      newData = data.filter((recipe: any) =>
        recipe.seo.some((s: string) =>
          s.toLowerCase().includes(text.trim().toLowerCase())
        )
      );
    }
    setSearchData(newData);
    splash();
  }, [text, mealIndex]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <CustomHomeHeader />
        <View
          style={[
            styles.searchSection,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <Ionicons
            name="search"
            style={styles.searchIcon}
            color={colors.text}
            size={SEARCH_SIZE}
          />
          <TextInput
            placeholder="Search"
            autoCapitalize="none"
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
              },
            ]}
            onChangeText={onChangeText}
            placeholderTextColor={colorScheme.gray}
          />
        </View>
        <View style={{ marginLeft: Styles.screenPadding }}>
          <CustomText style={{ fontSize: SEARCH_SIZE }} bold>
            Quick Search
          </CustomText>
        </View>
        <MealFlatList mealIndex={mealIndex} setMealIndex={setMealIndex} />
        {searchData.length > 0 ? (
          <ResultsFlatList data={searchData} navigate={navigation.navigate} />
        ) : (
          <View style={styles.noResults}>
            <CustomText bold style={{ fontSize: 20 }}>
              No Results Found
            </CustomText>
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    flex: 1,
    margin: Styles.screenPadding,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    fontFamily: "open-sans",
    fontSize: SEARCH_SIZE,
  },
  noResults: {
    height: Styles.HEIGHT / 3,
    width: "100%",
    marginTop: Styles.screenPadding * 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
