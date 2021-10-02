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
 import React from 'react';
 import {Image, Text, View} from 'react-native';
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 import {icons} from './source/constant';
 import Home from './source/screens/Home/Home';
 import Notification from './source/screens/Notification/Notification';
 import Menu from './source/screens/Menu/Menu';
 import Message from './source/screens/Message/Message';
 import Profile from './source/screens/Profile/Profile';
 import {NavigationContainer} from '@react-navigation/native';
import BlogPost from './source/screens/Blog/BlogPost';
import BlogDetail from './source/screens/Blog/BlogDetails';
 const Tab = createBottomTabNavigator();
 function MyTabs() {
   return (
     <Tab.Navigator
       screenOptions={({route}: {route: any}) => ({
        //  headerShown: false,
         tabBarIcon: ({focused}) => {
           let iconName;
           if (route.name === 'Home') {
             iconName = focused ? icons.home_m : icons.home;
           } else if (route.name === 'Notification') {
             iconName = focused ? icons.noti : icons.notification;
           } else if (route.name === 'Category') {
             iconName = focused ? icons.grid : icons.menu;
           } else if (route.name === 'Message') {
             iconName = focused ? icons.mess : icons.message;
           } else if (route.name === 'Profile') {
             iconName = focused ? icons.profile_m : icons.profile;
           }
           return (
             <Image
               source={iconName}
               style={{height: 20, width: 20}}
               resizeMode="contain"
             />
           );
         },
         tabBarActiveTintColor: '#eb760a',
         tabBarInactiveTintColor: '#000',
       })}>
       <Tab.Screen name="Home" component={Home} />
       <Tab.Screen name="Notification" component={Notification} />
       <Tab.Screen name="Category" component={Menu} />
       <Tab.Screen name="Message" component={Message} />
       <Tab.Screen name="Profile" component={Profile} />
     </Tab.Navigator>
   );
 }
 const App = () => {
   return (
     <View style={{flex: 1, backgroundColor: 'white'}}>
       <NavigationContainer>
         <MyTabs />
       </NavigationContainer>
     </View>
   );
 };
 export default App;
 