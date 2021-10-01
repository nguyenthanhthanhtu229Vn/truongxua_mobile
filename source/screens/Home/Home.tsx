/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import CreatePost from "./CreatePost";

const Home: React.FC = () => {
  return (
    <View style={{flex: 1,backgroundColor:"white"}}>
      <CreatePost/>
    </View>
  );
};
export default Home;
