import React from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../constant";

const BLOG = [
  {
    img: require("../../assets/images/class1.jpeg"),
    title: "Chao Mung Ngay Khai Giang",
    author: "Quang Huy",
    time: "cách đây 2 ngày ",
  },
  {
    img: require("../../assets/images/class2.jpeg"),
    title: "Dien Ra Hoi Thao Sinh Vien",
    author: "Quang Huy",
    time: "cách đây 2 ngày ",
  },
  {
    img: require("../../assets/images/class3.jpeg"),
    title: "Chao Mung Ngay Khai Giang",
    author: "Quang Huy",
    time: "cách đây 2 ngày ",
  },
  {
    img: require("../../assets/images/class4.jpeg"),
    title: "Chao Mung Ngay Khai Giang",
    author: "Quang Huy",
    time: "cách đây 2 ngày ",
  },
  {
    img: require("../../assets/images/class2.jpeg"),
    title: "Chao Mung Ngay Khai Giang",
    author: "Quang Huy",
    time: "cách đây 2 ngày ",
  },
  {
    img: require("../../assets/images/class3.jpeg"),
    title: "Chao Mung Ngay Khai Giang",
    author: "Quang Huy",
    time: "cách đây 2 ngày ",
  },
];
const BlogPost = ({ navigation }) => {
  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
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
         Tin Tức 
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            fontWeight: "400",
            marginRight: 10,
          }}
        >
          Trang Chủ/Tin Tức
        </Text>
      </View>
      <FlatList
        data={BLOG}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BlogDetail");
              }}
            >
              <View
                style={{
                  marginTop: 14,
                  marginHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <Image
                    source={item.img}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: SIZES.base,
                    }}
                  />
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      fontWeight: "500",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.h4,
                      fontWeight: "400",
                    }}
                  >
                    by <Text style={{ color: "#088dcd" }}> Andrew</Text>
                  </Text>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.h4,
                      fontWeight: "400",
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
    </ScrollView>
  );
};

export default BlogPost;
