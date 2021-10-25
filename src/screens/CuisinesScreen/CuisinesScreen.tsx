import React from "react";
import { StyleSheet, FlatList } from "react-native";
import BottomTabPadding from "../../components/BottomTabPadding";
import CustomHeader from "../../components/CustomHeader";
import Styles from "../../constants/Styles";
import { CUISINES } from "../../data/Categories";
import { CategoriesProps } from "../../navigation/categoriesNav/CategoriesNav";
import Cuisines from "./Cuisines";

const CatSpacing = Styles.screenPadding / 2;

export default function CuisinesScreen({
  route,
  navigation,
}: CategoriesProps<"Cuisines">) {
  return (
    <FlatList
      style={styles.container}
      columnWrapperStyle={styles.flat}
      data={CUISINES}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <Cuisines
            name={item.name}
            image={item.image}
            spacing={CatSpacing}
            onPress={() =>
              navigation.navigate("Results", { cuisine: item.name })
            }
          />
        );
      }}
      ListHeaderComponent={
        <CustomHeader title={route.name} spacing={CatSpacing} />
      }
      ListFooterComponent={<BottomTabPadding />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CatSpacing,
  },
  flat: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
