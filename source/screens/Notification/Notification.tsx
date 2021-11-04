/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";

const NOTIFI = [
  {
    id: 1,
    avatar: 'https://i.ibb.co/0fNSVCN/7-F3-D26-AD-C424-4-B9-E-A805-A1-CA7475-EABD.jpg',
    name: "Nguyễn Vui",
    date: "Cách đây 5 phút",
    content: "Nguyễn Vui đã đã tại bài viết",
  },
  {
    id: 2,
    avatar: 'https://i.ibb.co/LtcNYGT/img1.jpg',
    name: "Sara Honey Podcast",
    date: "3 phút",
    content: " Khoa Thanh đã bình luận ",
  },
  {
    id: 3,
    avatar: 'https://i.ibb.co/mbZ6PDH/IMG-5440.jpg',
    name: "Sara Honey Podcast",
    date: "10 phút ",
    content: "Kiều linh đã trả lời  bình luận",
  },
  {
    id: 4,
    avatar: 'https://i.ibb.co/Kmt2Gd2/0-C23-A4-C7-8931-445-F-B915-DD78788-E1-A48.jpg',
    name: "Sara Honey Podcast",
    date: "Cách đây 10 phút",
    content: "Quang Huy đang theo dõi Khoa ",
  },
];
const Notification: React.FC = () => {
  return (
    <ScrollView >
    <View>
     <View
          style={{
            backgroundColor: "#088dcd",
            height: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white2,
              fontWeight: "700",
              marginLeft: 10,
            }}
          >
            Thông Báo
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              fontWeight: "400",
              marginRight: 10,
            }}
          >
            Trang Chủ/Thông Báo
          </Text>
        </View>
        <View  style={style.container}>
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
                  source={{uri: item.avatar}}
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
    </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
});
export default Notification;
