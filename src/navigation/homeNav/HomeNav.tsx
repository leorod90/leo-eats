import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen/DetailsScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import { stackAnimations } from "../StackAnimation";
enableScreens();

type HomeParamList = {
  Home: undefined;
  Details: { data: any };
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};

const Stack = createSharedElementStackNavigator<HomeParamList>();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        ...stackAnimations,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === "Home" && showing) {
            const { data } = route.params;
            return [data.label];
          }
        }}
      />
    </Stack.Navigator>
  );
}
