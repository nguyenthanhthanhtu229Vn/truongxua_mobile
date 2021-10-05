/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import CreatePost from "./CreatePost";

const POST = [
  {
    id: 1,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    icons: icons.globe,
    date: "Published: Sep, 15,2020",
    content:
      "Supervision as a Personnel Development Device Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
    imagesPost: require("../../assets/images/class1.jpeg"),
  },
  {
    id: 2,
    avatar: require("../../assets/images/avatar1.jpeg"),
    name: "Sara Honey Podcast",
    icons: icons.globe,
    date: "Published: Sep, 15,2020",
    content:
      "Supervision as a Personnel Development Device Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
    imagesPost: require("../../assets/images/class4.jpeg"),
  },
  {
    id: 3,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    icons: icons.globe,
    date: "Published: Sep, 15,2020",
    content:
      "Supervision as a Personnel Development Device Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
    imagesPost: require("../../assets/images/class2.jpeg"),
  },
  {
    id: 4,
    avatar: require("../../assets/images/avatar.jpeg"),
    name: "Sara Honey Podcast",
    icons: icons.globe,
    date: "Published: Sep, 15,2020",
    content:
      "Supervision as a Personnel Development Device Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
    imagesPost: require("../../assets/images/class3.jpeg"),
  },
];
const News: React.FC = () => {
  return (
    <View style={{ marginTop: 150 }}>
      <FlatList
        data={POST}
        keyExtractor ={item => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                height: 450,
                backgroundColor: COLORS.white2,
                shadowOpacity: 0.4,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={item.avatar}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: SIZES.largeTitle,
                    }}
                  />
                  <Text
                    style={{
                      color: COLORS.blue,
                      marginLeft: 4,
                      ...FONTS.h3,
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: -34,
                    marginLeft: 64,
                  }}
                >
                  <Image
                    source={icons.globe}
                    style={{ height: 20, width: 20 }}
                  />
                  <Text style={{ marginLeft: 8 }}>{item.date}</Text>
                </View>
                <Text
                  style={{
                    marginTop: 20,
                    ...FONTS.h3,
                    color: COLORS.black,
                    marginBottom: 10,
                  }}
                >
                  {item.content}
                </Text>
                <Image
                  source={item.imagesPost}
                  style={{ width: "100%" }}
                  resizeMode="cover"
                />

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 14,
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <Image source={icons.thumpUp} style={style.iconf} />
                  <Image source={icons.heart} style={style.iconf} />
                  <Image source={icons.angry} style={style.iconf} />
                  <Image source={icons.sad} style={style.iconf} />
                  <Text>10+</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity style={style.btn}>
                    <Image source={icons.like} style={style.icon}></Image>
                    <Text style={style.text}>Like </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={style.btn}>
                    <Image source={icons.comment} style={style.icon}></Image>
                    <Text style={style.text}>Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.btn}>
                    <Image source={icons.share} style={style.icon}></Image>
                    <Text style={style.text}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
    width: 100,
    height: 30,
    backgroundColor: "#eeecec",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    shadowOpacity: 0.2,
  },
  icon: {
    height: 14,
    width: 14,
    marginLeft: 8,
  },
  iconf: {
    height: 20,
    width: 20,
  },
  text: {
    ...FONTS.h4,
    fontWeight: "500",
    marginLeft: 10,
  },
});
export default News;
