import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
import EditPostGroup from "../Group/EditModal";
import AboutSchool from "../School/AboutSchool";
import AddEvent from "../event/AddEvent";
import EditCommentEvent from "../event/EditCommentEvent";
import EditComment from "../Group/EditComment";
import EditBackgroundGroup from "../Group/EditBackgroundGroup";
import PayPalLogin from "../event/PaypalLogin";
import PaypalDetails from "../event/PayPalDetails";
import ChatMessage from "../Alumini/ChatMessage";
import CreatePost from "../Home/CreatePost";

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
      <Tab.Screen
        name="Danh Mục"
        component={Menu}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Thông Báo " component={Notification} /> */}
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
      {/* News */}
      <Stack.Screen name="Tạo Tin Tức" component={CreatePost} />
      {/* ======= Group Post ========= */}
      <Stack.Screen name="Sửa Bài Viết" component={EditPostModal} />
      <Stack.Screen name="Sửa Bài Đăng" component={EditPostGroup} />
      <Stack.Screen name="Tạo Nhóm" component={AddGroup} />
      <Stack.Screen name="Chi Tiết Nhóm" component={GroupDetail} />
      <Stack.Screen name="Chi Tiết Bài Đăng" component={GroupPostDetail} />
      <Stack.Screen name="Nhóm" component={Group} />
      <Stack.Screen name="Tạo Bài Đăng" component={CreatePostInGroup} />
      <Stack.Screen name="Sửa Bình Luận Bài Viết" component={EditComment} />
      <Stack.Screen name="Sửa Hình Nền Nhóm" component={EditBackgroundGroup} />

      {/* ======Event ======= */}
      <Stack.Screen name="Sự Kiện" component={Event} />
      <Stack.Screen name="Chi Tiết Sự Kiện" component={EventDetail} />
      <Stack.Screen name="Tạo Sự Kiện" component={AddEvent} />
      <Stack.Screen name="Sửa Bình Luận" component={EditCommentEvent} />
      <Stack.Screen name="Đăng nhập Paypal" component={PayPalLogin} />
      <Stack.Screen
        name="Chi tiết thanh toán"
        component={PaypalDetails}
        options={{ headerShown: false }}
      />

      {/*=======Alumini ======  */}
      <Stack.Screen name="Hồ Sơ" component={Profile} />
      <Stack.Screen name="Cập Nhập Hồ Sơ" component={UpdateProfile} />
      <Stack.Screen name="Chat 1 1" component={ChatMessage} />
      {/* <Stack.Screen name="Thanh Toán" component={PayPal} /> */}
      {/* <Stack.Screen name="Hồ Sơ" component={Profile} /> */}
      {/* =======Other====== */}
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="BlogPost" component={BlogPost} />
      <Stack.Screen name="Cài Đặt" component={Setting} />

      {/* =====School== */}
      <Stack.Screen name="Thông Tin Trường" component={AboutSchool} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
