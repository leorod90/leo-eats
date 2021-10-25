import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import { FavNavProps } from "../../navigation/favNav/FavNav";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import CustomHeader from "../../components/CustomHeader";
import Card from "../../components/Card";
import AnimatedWrapper from "./AnimatedWrapper";
import { ScrollView } from "react-native-gesture-handler";
import Styles from "../../constants/Styles";

export default function FavoritesScreen({
  route,
  navigation,
}: FavNavProps<"Favorites">) {
  const { colors } = useTheme();
  const data = useSelector((state: rootState) => state.dataReducer.favorites);
  const row = Math.ceil(data.length / 2);
  const height =
    row * Styles.cardHeight + row * Styles.screenPadding + Styles.screenPadding;
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scroll}>
          <CustomHeader title={route.name} />
          <View style={[styles.animContainer, { height }]}>
            {data.map((item: any, index) => {
              let even = false;
              if (index % 2 == 0) {
                even = true;
              }
              return (
                <AnimatedWrapper index={index} key={item.key} even={even}>
                  <Card
                    label={item.label}
                    image={item.image}
                    totalTime={item.totalTime}
                    itemKey={item.key}
                    onPress={() =>
                      navigation.navigate("Details", { data: item })
                    }
                  />
                </AnimatedWrapper>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <>
          <CustomHeader title={route.name} />
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color={colors.text} />
            <CustomText bold style={{ fontSize: 16 }}>
              No Favorites
            </CustomText>
          </View>
        </>
      )}
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
  animContainer: {
    marginHorizontal: Styles.screenPadding,
    // marginBottom: Styles.bottomTabHeight * 20,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
