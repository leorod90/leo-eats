import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FavoritesScreen from "../../screens/FavoritesScreen/FavoritesScreen";
import DetailsScreen from "../../screens/DetailsScreen/DetailsScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { MyTransition } from "../DetailAnimation";
import { stackAnimations } from "../StackAnimation";

type FavParamList = {
  Favorites: undefined;
  Details: { data: any };
};

export type FavNavProps<T extends keyof FavParamList> = {
  navigation: StackNavigationProp<FavParamList, T>;
  route: RouteProp<FavParamList, T>;
};

const Stack = createSharedElementStackNavigator<FavParamList>();

export default function AuthNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...stackAnimations,
      }}
    >
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === "Favorites" && showing) {
            const { data } = route.params;
            return [data.label];
          }
        }}
      />
    </Stack.Navigator>
  );
}
