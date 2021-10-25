import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const colorScheme = {
  splash: "#22292F",
  white: "#fafafa",
  gray: "#757575",
  silver: "#CFD8DC",
  errorBackground: "#f6f6f6",
  // main: "#05D9C5",
  // secondary: "#EFC7A2",
  // font: "#e8e6e1",
  // screenBackground: "#27241d",
  // cardBackground: "#423d33",
};

export const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#14937C",
    background: "#fafafa",
    card: "#fff",
    text: "#212121",
    // border: "rgb(199, 199, 204)",
    notification: "#FFA726",
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#05D9C5",
    background: "#1E2025",
    card: "#3B424C",
    text: "#ADB0B6",
    // border: "rgb(199, 199, 204)",
    notification: "#EFC7A2",
  },
};
