/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  AsyncStorage,
  FlatList,
} from "react-native";
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

const MemberSchool = [
  {
    avatar: require("../../assets/images/event.jpg"),
    name: "Bryan Tran",
    addess: "Quan 7,HCM",
  },
  {
    avatar: require("../../assets/images/event.jpg"),
    name: "Bryan Tran",
    addess: "Quan 7,HCM",
  },
  {
    avatar: require("../../assets/images/event.jpg"),
    name: "Bryan Tran",
    addess: "Quan 7,HCM",
  },
  {
    avatar: require("../../assets/images/event.jpg"),
    name: "Bryan Tran",
    addess: "Quan 7,HCM",
  },
];

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<string>("");
  const [groups, setGroup] = useState<boolean>(false);
  const [events, setEvent] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>();
  const [idGroup, setIdGroup] = useState<string>();
  const [myInfo, setMyInfo] = useState<boolean>(false);
  const eventURL =
    "https://truongxuaapp.online/api/v1/events?pageNumber=0&pageSize=0";
  const groupURL =
    "https://truongxuaapp.online/api/v1/groups?pageNumber=0&pageSize=0";
  const alumniURL =
    "https://truongxuaapp.online/api/v1/alumni?pageNumber=0&pageSize=0";
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setIdUser(objUser.Id);
    setIdGroup(objUser.GroupId);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    await featchMyInfo(objUser.Id, headers);
    await featchGroups(headers);
    await featchAlumni(headers);
  };

  const featchMyInfo = async (id, headers) => {
    try {
      const reponse = await axios.get(
        "https://truongxuaapp.online/api/v1/alumni/" + id,
        { headers }
      );
      if (reponse.status === 200) {
        setMyInfo(reponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function featchEvents(headers) {
    try {
      const response = await axios.get(eventURL, { headers });
      if (response.status === 200) {
        setEvent(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function featchGroups(headers) {
    try {
      const response = await axios.get(groupURL, { headers });
      if (response.status === 200) {
        setGroup(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function featchAlumni(headers) {
    try {
      const response = await axios.get(alumniURL, { headers });
      if (response.status == 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    tokenForAuthor();
  }, []);

  const countAlumniInGroup = (idGroup) => {
    let count = 0;
    for (let i = 0; i < user.length; i++) {
      if (user[i].groupId == idGroup) {
        count++;
      }
    }
    return count;
  };
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
        <View>
           <FlatList
             horizontal={true}
             contentContainerStyle={{
               flexDirection: "row",
             }}
             data={MemberSchool}
             renderItem={({ item, index }) => {
               return (
                 <View style={style.follow}>
                   <Image source={item.avatar} style={style.avatarF} />
                   <Text style={style.nameF}>{item.name}</Text>
                   <Text style={style.addressF}>{item.addess}</Text>
                   <TouchableOpacity style={style.btnF}>
                     <Text style={style.textF}>Theo Dõi</Text>
                   </TouchableOpacity>
                 </View>
               );
             }}
           />
         </View>
         <View style={style.title}>
           <Text style={style.textTitle}>Người bạn đang theo dõi</Text>
         </View>

         {/* =====begin ==== */}
         <View>
           <FlatList
             horizontal={true}
             contentContainerStyle={{
               flexDirection: "row",
             }}
             data={MemberSchool}
             renderItem={({ item, index }) => {
               return (
                 <View style={style.follow}>
                   <Image source={item.avatar} style={style.avatarF} />
                   <Text style={style.nameF}>{item.name}</Text>
                   <Text style={style.addressF}>{item.addess}</Text>
                   <TouchableOpacity style={style.btnF}>
                     <Text style={style.textF}>Theo Dõi</Text>
                   </TouchableOpacity>
                 </View>
               );
             }}
           />
         </View>
          {/* Joined Group */}

          <View style={style.title}>
            <Text style={style.textTitle}>Nhóm đã tham gia</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Group")}>
              <Text style={style.more}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal style={{ flexDirection: "row" }}>
            <FlatList
              numColumns={10}
              keyExtractor={({ id }, index) => id}
              data={groups}
              renderItem={({ item, index }) => {
                if (idGroup == item.id) {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("GroupDetails", {
                            id: item.id,
                            numberAlumni: countAlumniInGroup(item.id),
                          })
                        }
                      >
                        <Image
                          source={{ uri: item.backgroundImg }}
                          style={{ width: 185, height: 200, borderRadius: 5 }}
                        ></Image>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 5,
                          }}
                        >
                          <Text numberOfLines={1} style={style.group}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <MaterialIcons
                              name="group"
                              style={style.iconGroup}
                            ></MaterialIcons>
                            <Text style={style.numberParti}>
                              {countAlumniInGroup(item.id)} người
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
                return null;
              }}
            />
          </ScrollView>
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

          {/* <View style={style.title}>
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
          </View> */}
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
    fontSize: 18,
fontWeight: "500",
paddingLeft: 10,
  },
  group: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4d5165",
    width: 110,
    overflow: "hidden",
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
  follow: {
    backgroundColor: "#f7f4f4",
    height: 200,
    width: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#E1E8EC",
    marginTop: 18,
  },
  avatarF: {
    height: 100,
    width: 100,
    marginLeft: 24,
    marginVertical: 8,
    borderRadius: 8,
  },
  nameF: {
    textAlign: "center",
    color: COLORS.black,
    fontWeight: "500",
    fontSize: 16,
  },
  addressF: {
    textAlign: "center",
    color: COLORS.blue,
    fontWeight: "400",
    fontSize: 16,
  },
  textF: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
  },
  btnF: {
    backgroundColor: COLORS.blue,
    height: 30,
    width: 120,
    marginLeft: 10,
    marginTop: 16,
    borderRadius: 6,
  },
});
export default Profile;
