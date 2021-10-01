/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import News from './News';

const Home: React.FC = () => {
  return (
    <View style={{flex: 1,}}>
      <News />
    </View>
  );
};
export default Home;
