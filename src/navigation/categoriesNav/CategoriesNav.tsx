import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CuisinesScreen from "../../screens/CuisinesScreen/CuisinesScreen";
import ResultsScreen from "../../screens/ResultsScreen/ResultsScreen";
import DetailsScreen from "../../screens/DetailsScreen/DetailsScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { stackAnimations } from "../StackAnimation";

type CategoriesParamList = {
  Cuisines: undefined;
  Results: { cuisine: string };
  Details: { data: any };
};

export type CategoriesProps<T extends keyof CategoriesParamList> = {
  navigation: StackNavigationProp<CategoriesParamList, T>;
  route: RouteProp<CategoriesParamList, T>;
};

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator<CategoriesParamList>();

export default function AuthNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...stackAnimations,
      }}
    >
      <Stack.Screen name="Cuisines" component={CuisinesScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === "Results" && showing) {
            const { data } = route.params;
            return [data.label];
          }
        }}
      />
    </Stack.Navigator>
  );
}
