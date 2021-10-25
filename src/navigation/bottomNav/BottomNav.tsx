import * as React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import CustomTab from "./CustomTab";

import HomeNav from "../homeNav/HomeNav";
import CategoriesNav from "../categoriesNav/CategoriesNav";
import FavNav from "../favNav/FavNav";
import SettingsScreen from "../../screens/SettingsScreen/SettingsScreen";

type BottomParamList = {
  HomeNav: undefined;
  CategoriesNav: undefined;
  FavNav: undefined;
  Settings: undefined;
};

export type BottomNavProps<T extends keyof BottomParamList> = {
  navigation: BottomTabNavigationProp<BottomParamList, T>;
  route: RouteProp<BottomParamList, T>;
};

const Tab = createBottomTabNavigator<BottomParamList>();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTab {...props} />}
      screenOptions={{
        headerShown: false,
        // unmountOnBlur: true,
      }}
    >
      <Tab.Screen name="HomeNav" component={HomeNav} />
      <Tab.Screen
        name="CategoriesNav"
        component={CategoriesNav}
        options={{ lazy: false }}
      />
      <Tab.Screen name="FavNav" component={FavNav} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
