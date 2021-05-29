/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import "react-native-gesture-handler";
import RootNavigation from "./src/navigation/rootNavigation";
import { Provider } from "react-redux";
import store from "./src/redux";


const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};


export default App;
