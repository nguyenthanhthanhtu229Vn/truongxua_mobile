/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { ImageBackground, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const Profile: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/images/imgSignIn/bgSignIn.jpg")}
          style={{
            flex: 2,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/avatar.jpeg")}
            style={style.mainAvt}
          ></Image>
          <Text style={style.nameProfile}>Nguyen Van A</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity>
              <AntDesign name="user" style={style.optionTop}></AntDesign>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="edit-2" style={style.optionTop2}></Feather>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Recent Post */}

        <View style={{ backgroundColor: COLORS.white2, padding: 10 }}>
          <View style={style.title}>
            <Text style={style.textTitle}>Bài viết gần nhất</Text>
            <TouchableOpacity>
              <Text style={style.more}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 450,
              backgroundColor: COLORS.white2,
              shadowOpacity: 0.4,
              marginBottom: 16,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/images/avatar1.jpeg")}
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
                  Nguyen Van A
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: -34,
                  marginLeft: 64,
                }}
              >
                <Image source={icons.globe} style={{ height: 20, width: 20 }} />
                <Text style={{ marginLeft: 8 }}>1 giờ trước</Text>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  ...FONTS.h3,
                  color: COLORS.black,
                  marginBottom: 10,
                }}
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet totam laboriosam impedit corrupti id? Aliquam, dolore
                esse! Perferendis dignissimos saepe excepturi earum porro quos
                beatae consequatur reprehenderit! Numquam, nisi eaque.
              </Text>
              <Image
                source={require("../../assets/images/imgSignIn/bgSignIn.jpg")}
                resizeMode="cover"
                style={{ width: "100%", height: 150 }}
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
                  <Text style={style.text}>Thích </Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.btn}>
                  <Image source={icons.comment} style={style.icon}></Image>
                  <Text style={style.text}>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btn}>
                  <Image source={icons.share} style={style.icon}></Image>
                  <Text style={style.text}>Chia sẽ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Joined Group */}

          <View style={style.title}>
            <Text style={style.textTitle}>Nhóm đã tham gia</Text>
            <TouchableOpacity>
              <Text style={style.more}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
          >
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Image
                source={require("../../assets/images/party5.jpg")}
                style={{ width: 185, height: 200, borderRadius: 5 }}
              ></Image>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={style.group}>Nhóm 12a1</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="group"
                    style={style.iconGroup}
                  ></MaterialIcons>
                  <Text style={style.numberParti}>15 người</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/party5.jpg")}
                style={{ width: 185, height: 200, borderRadius: 5 }}
              ></Image>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={style.group}>Nhóm 12a1</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="group"
                    style={style.iconGroup}
                  ></MaterialIcons>
                  <Text style={style.numberParti}>15 người</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Event */}
          <View style={style.title}>
            <Text style={style.textTitle}>Sự kiện đã tham gia</Text>
            <TouchableOpacity>
              <Text style={style.more}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
          >
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Image
                source={require("../../assets/images/event2.jpg")}
                style={{ width: 185, height: 200, borderRadius: 5 }}
              ></Image>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={style.group}>Sự kiện A</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="access-time"
                    style={style.iconGroup}
                  ></MaterialIcons>
                  <Text style={style.numberParti}>15/10/2021</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/event3.jpg")}
                style={{ width: 185, height: 200, borderRadius: 5 }}
              ></Image>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={style.group}>Sự kiện B</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="access-time"
                    style={style.iconGroup}
                  ></MaterialIcons>
                  <Text style={style.numberParti}>26/10/2021</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Blog News */}

          <View style={style.title}>
            <Text style={style.textTitle}>Blogs</Text>
            <TouchableOpacity>
              <Text style={style.more}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
              <Image
                source={require("../../assets/images/event.jpg")}
                style={{
                  flex: 1,
                  height: 150,
                  marginRight: 10,
                  borderRadius: 5,
                }}
              ></Image>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={style.titleBlog}>Văn nghệ trường </Text>
                <Text style={style.by}>
                  bởi <Text style={style.authorBlog}>Van A</Text>
                </Text>
                <Text style={style.timeBlog}>2 giờ trước</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Image
                source={require("../../assets/images/event.jpg")}
                style={{
                  flex: 1,
                  height: 150,
                  marginRight: 10,
                  borderRadius: 5,
                }}
              ></Image>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={style.titleBlog}>Văn nghệ trường </Text>
                <Text style={style.by}>
                  bởi <Text style={style.authorBlog}>Van A</Text>
                </Text>
                <Text style={style.timeBlog}>2 giờ trước</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  mainAvt: {
    height: 80,
    width: 80,
    borderRadius: SIZES.largeTitle,
    marginTop: 15,
    borderColor: "white",
    borderWidth: 2,
  },
  nameProfile: {
    fontFamily: "Roboto",
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  optionTop: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#ff2c55",
    borderRadius: SIZES.largeTitle,
    padding: 7,
  },
  optionTop2: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    backgroundColor: "#00b4f0",
    borderRadius: SIZES.largeTitle,
    padding: 7,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textTitle: {
    fontFamily: "Roboto",
    borderLeftWidth: 5,
    borderLeftColor: "#088dcd",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  group: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "#4d5165",
  },
  iconGroup: {
    color: "#088dcd",
    fontSize: 17,
    marginRight: 5,
  },
  more: {
    fontFamily: "Roboto",
    color: "#088dcd",
    fontSize: 15,
  },
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
  numberParti: {
    fontFamily: "Roboto",
    color: "gray",
    fontSize: 15,
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
  titleBlog: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  by: {
    fontFamily: "Roboto",
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
  },
  authorBlog: {
    fontFamily: "Roboto",
    color: "#088dcd",
    fontSize: 16,
  },
  timeBlog: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "gray",
  },
});
export default Profile;
