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
import { Image, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons } from "./source/constant";
import Home from "./source/screens/Home/Home";
import Notification from "./source/screens/Notification/Notification";
import Menu from "./source/screens/Menu/Menu";
import Profile from "./source/screens/Profile/Profile";
import { NavigationContainer } from "@react-navigation/native";
import BlogPost from "./source/screens/Blog/BlogPost";
import BlogDetail from "./source/screens/Blog/BlogDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./source/screens/SignInUp/SignIn";
import SignUp from "./source/screens/SignInUp/SignUp";
import Event from "./source/screens/event/Event";
import EventDetail from "./source/screens/event/EventDetail";
import Group from "./source/screens/Group/Group";
import GroupDetail from "./source/screens/Group/GroupDetail";
import Setting from "./source/screens/Setting/Setting";
import AddEvent from "./source/screens/event/AddEvent";
import AddGroup from "./source/screens/Group/AddGroup";
import EditPostModal from "./source/screens/Home/EditModal";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Trang Chủ") {
            iconName = focused ? icons.home_m : icons.home;
          } else if (route.name === "Thông Báo ") {
            iconName = focused ? icons.noti : icons.notification;
          } else if (route.name === "Danh Mục") {
            iconName = focused ? icons.grid : icons.menu;
          } else if (route.name === "Group") {
            iconName = focused ? icons.groups : icons.groups;
          } else if (route.name === "Profile") {
            iconName = focused ? icons.profile_m : icons.profile;
          }
          return (
            <Image
              source={iconName}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: "#eb760a",
        tabBarInactiveTintColor: "#000",
      })}
    >
      <Tab.Screen name="Trang Chủ" component={Home} />
      <Tab.Screen name="Danh Mục" component={Menu} />
      <Tab.Screen name="Thông Báo " component={Notification} />
    </Tab.Navigator>
  );
}
const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name = "Edit Post" component={EditPostModal} />
          <Stack.Screen name="NewEvent" component={AddEvent} />
          <Stack.Screen name="NewGroup" component={AddGroup} />
          <Stack.Screen name="GroupDetails" component={GroupDetail} />
          <Stack.Screen name="Group" component={Group} />
          <Stack.Screen name="BlogDetail" component={BlogDetail} />
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
          <Stack.Screen name="BlogPost" component={BlogPost} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default App;
