import { CardStyleInterpolators } from "@react-navigation/stack";

export const stackAnimations = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  // cardStyle: { backgroundColor: "transparent", opacity: 1 },
  // transitionConfig: () => ({
  //   containerStyle: {
  //     backgroundColor: "transparent",
  //   },
  // }),
  // cardStyleInterpolator: ({ current, next, layouts }: any) => {
  //   return {
  //     cardStyle: {
  //       opacity: current.progress,
  //     },
  //     transitionSpec: {
  //       open: {
  //         animation: "timing",
  //         config: { duration: 250 },
  //       },
  //       close: { animation: "timing", config: { duration: 250 } },
  //     },
  //   };
  // },
};
