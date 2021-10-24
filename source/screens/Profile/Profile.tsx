/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, Image, AsyncStorage } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const Profile: React.FC = () => {
  const navigation = useNavigation();
  const [idUser, setIdUser] = useState<string>();
  const [myInfo, setMyInfo] = useState<boolean>(false);
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setIdUser(objUser.Id);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    await featchMyInfo(objUser.Id);
  };

  const featchMyInfo = async (id) => {
    try {
      const reponse = await axios.get(
        "http://20.188.111.70:12348/api/v1/alumni/" + id
      );
      if (reponse.status === 200) {
        setMyInfo(reponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tokenForAuthor();
  }, []);

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
          <Image source={{ uri: myInfo.img }} style={style.mainAvt}></Image>
          <Text style={style.nameProfile}>{myInfo.name}</Text>
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
            <Text style={style.textTitle}>Mô tả</Text>
          </View>
          <Text style={style.bio}>{myInfo.bio}</Text>
          <View style={style.title}>
            <Text style={style.textTitle}>Người theo dõi bạn</Text>
          </View>
          <View style={style.title}>
            <Text style={style.textTitle}>Người bạn đang theo dõi</Text>
          </View>
          {/* Joined Group */}

          <View style={style.title}>
            <Text style={style.textTitle}>Nhóm đã tham gia</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Group")}>
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
            <TouchableOpacity onPress={() => navigation.navigate("Event")}>
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
    backgroundColor: "#00b4f0",
    padding: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
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
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  textTitle: {
    borderLeftWidth: 5,
    borderLeftColor: "#088dcd",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  group: {
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
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  by: {
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
  },
  authorBlog: {
    color: "#088dcd",
    fontSize: 16,
  },
  timeBlog: {
    fontSize: 16,
    color: "gray",
  },
  bio: {
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
    marginTop: 10,
  },
});
export default Profile;
