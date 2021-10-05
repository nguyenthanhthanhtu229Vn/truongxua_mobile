/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";

const NOTIFI = [
  {
    id: 1,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 2,
    avatar: require("../../assets/images/avatar1.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 3,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 4,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 5,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 6,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 7,
    avatar: require("../../assets/images/avatar1.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 8,
    avatar: require("../../assets/images/avatar1.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
  {
    id: 9,
    avatar: require("../../assets/images/avatar1.jpeg"),
    name: "Sara Honey Podcast",
    date: "5 mins ago",
    content: "Some notification",
  },
];

const Notification: React.FC = () => {
  return (
    <View style={style.container}>
     
        <FlatList
        showsVerticalScrollIndicator={false}
          data={NOTIFI}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 20,
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.avatar}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: SIZES.largeTitle,
                  }}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      marginLeft: 4,
                      ...FONTS.h3,
                      fontWeight: "500",
                      fontSize: 17,
                    }}
                  >
                    {item.content}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.darkGray,
                      marginLeft: 4,
                      ...FONTS.h4,
                      fontWeight: "500",
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>
            );
          }}
        />
     
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
});
export default Notification;
