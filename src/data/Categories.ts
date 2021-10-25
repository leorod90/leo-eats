export interface CATEGORY {
  name: string;
  image: NodeRequire;
}

export const MEALS: CATEGORY[] = [
  {
    name: "All",
    image: require("../../assets/images/All.jpg"),
  },
  {
    name: "Breakfast",
    image: require("../../assets/images/Breakfast.jpg"),
  },
  {
    name: "Lunch",
    image: require("../../assets/images/Lunch.jpg"),
  },
  {
    name: "Dinner",
    image: require("../../assets/images/Dinner.jpg"),
  },
  {
    name: "Snacks",
    image: require("../../assets/images/Snack.jpg"),
  },
];

export const CUISINES: CATEGORY[] = [
  {
    name: "American",
    image: require("../../assets/images/American.jpg"),
  },
  {
    name: "Caribbean",
    image: require("../../assets/images/Caribbean.jpg"),
  },
  {
    name: "Chinese",
    image: require("../../assets/images/Chinese.jpg"),
  },
  {
    name: "Indian",
    image: require("../../assets/images/Indian.jpg"),
  },
  {
    name: "Italian",
    image: require("../../assets/images/Italian.jpg"),
  },
  {
    name: "Japanese",
    image: require("../../assets/images/Japanese.jpg"),
  },
  {
    name: "Kosher",
    image: require("../../assets/images/Kosher.jpg"),
  },
  // {
  //   name: "Mediterranean",
  //   image: require("../../assets/images/Mediterranean.jpg"),
  // },
  {
    name: "Mexican",
    image: require("../../assets/images/Mexican.jpg"),
  },
  {
    name: "South American",
    image: require("../../assets/images/South-American.jpg"),
  },
  {
    name: "Thai",
    image: require("../../assets/images/Thai.jpg"),
  },
];
