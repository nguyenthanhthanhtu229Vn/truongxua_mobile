/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import CreatePost from "./CreatePost";
import News from "./News";

const Home: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <News />
    </View>
  );
};
export default Home;
