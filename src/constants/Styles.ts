import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

const screenPadding = width * 0.05;
const categoryWidth = width / 2 - screenPadding * 1.5;
const cardWidth = width / 2 - screenPadding * 1.5;

let sizes = {
  iconSize: 32,
  fontSizeS: 14,
  fontSizeM: 18,
  fontSizeL: 24,
  mealSize: 100,
  bottomIconSize: 32,
  bottomTabHeight: 70,
  categoryWidth,
  categoryHeight: categoryWidth * 1.5,
  cardWidth,
  cardHeight: cardWidth * 1.6,
};

export default {
  WIDTH: width,
  HEIGHT: height,
  screenPadding,
  ...sizes,

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
};
