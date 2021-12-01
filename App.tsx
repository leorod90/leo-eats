import React, { useEffect } from "react";
import { Provider } from "react-redux";
import stores from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import Navigator from "./src/navigation/Index";
import { enableScreens } from "react-native-screens";
enableScreens();
const { store, persistor } = stores();

const splash = async () => {
  try {
    await SplashScreen.preventAutoHideAsync();
  } catch (e) {
    console.warn(e);
  }
};
splash();
export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};
