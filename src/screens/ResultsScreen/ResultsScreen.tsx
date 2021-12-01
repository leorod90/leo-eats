import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Styles from "../../constants/Styles";
import { CategoriesProps } from "../../navigation/categoriesNav/CategoriesNav";
import { Ionicons } from "@expo/vector-icons";
import CustomStatusBar from "../../components/CustomStatusBar";
import CustomText from "../../components/CustomText";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import Card from "../../components/Card";

const ICON_SIZE = 24;

export default function ResultsScreen({
  route,
  navigation,
}: CategoriesProps<"Results">) {
  const { cuisine } = route.params;
  const { colors } = useTheme();
  const [searchData, setSearchData] = useState([]);

  const data = useSelector((state: rootState) => state.dataReducer.data);
  const newData = useCallback(
    () =>
      data.filter((data: any) =>
        data.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      ),
    []
  );

  useEffect(() => {
    setSearchData(newData);
  }, []);

  const Header = () => (
    <>
      <CustomStatusBar />
      <View
        style={{
          padding: Styles.screenPadding,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="chevron-back"
          size={ICON_SIZE}
          style={{ marginRight: 15 }}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <CustomText style={{ fontSize: 22 }} bold>
          {route.name}
        </CustomText>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {searchData.length > 0 ? (
        <FlatList
          data={searchData}
          ListHeaderComponent={() => <Header />}
          numColumns={2}
          columnWrapperStyle={styles.column}
          renderItem={({ item }: any) => (
            <View style={{ marginLeft: Styles.screenPadding }}>
              <Card
                label={item.label}
                image={item.image}
                totalTime={item.totalTime}
                itemKey={item.key}
                onPress={() => navigation.navigate("Details", { data: item })}
              />
            </View>
          )}
        />
      ) : (
        <>
          <Header />
          <View style={styles.empty}>
            <Ionicons name="sad-outline" size={64} color={colors.text} />
            <CustomText bold style={{ fontSize: 16 }}>
              No Results Found
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
  column: {
    flexGrow: 1,
  },
  animContainer: {
    marginHorizontal: Styles.screenPadding,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
