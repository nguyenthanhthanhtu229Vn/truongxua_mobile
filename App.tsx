/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from "react";
import {View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./source/screens/RootNavigator/Rootnavigator";

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NavigationContainer >
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
};
export default App;
