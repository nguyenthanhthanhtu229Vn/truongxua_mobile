import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons } from "../../constant";
import UpdateProfile from "../Alumini/UpdateProfile";
import BlogDetail from "../Blog/BlogDetails";
import BlogPost from "../Blog/BlogPost";
import EventDetail from "../event/EventDetail";
import AddGroup from "../Group/AddGroup";
import CreatePostInGroup from "../Group/CreatePostInGroup";
import GroupDetail from "../Group/GroupDetail";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import Setting from "../Setting/Setting";
import SignIn from "../SignInUp/SignIn";
import SignUp from "../SignInUp/SignUp";
import Event from "../event/Event";
import Notification from "../Notification/Notification";
import Group from "../Group/Group";
import { Image, View } from "react-native";
import GroupPostDetail from "../Group/GroupPostDetails";
import Home from "../Home/Home";
import EditPostModal from "../Home/EditModal";
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

const RootNavigator = () => {
  return (
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
      {/* ======= Group Post ========= */}
      <Stack.Screen name="EditPost" component={EditPostModal} />
      <Stack.Screen name="NewGroup" component={AddGroup} />
      <Stack.Screen name="GroupDetails" component={GroupDetail} />
      <Stack.Screen name="GroupPostDetail" component={GroupPostDetail} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="Create Post In Group" component={CreatePostInGroup} />

      {/* ======Event ======= */}
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="EventDetail" component={EventDetail} />

      {/*=======Alumini ======  */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Update Profile" component={UpdateProfile} />

      {/* =======Other====== */}
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="BlogPost" component={BlogPost} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
