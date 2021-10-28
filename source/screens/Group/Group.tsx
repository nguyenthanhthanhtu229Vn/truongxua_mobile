import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { set } from "react-native-reanimated";

const JOINED_GROUP = [
  {
    img: require("../../assets/images/event.jpg"),
    name: "Quang huy",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "Quang huy",
  },
];
const SUGGESTED = [
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
];
const Group = () => {
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setGroupUser(objUser.GroupId);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    await featchGroups(headers);
    await featchAlumni(headers);
  };
  const [groups, setGroup] = useState<boolean>(false);
  const navigation = useNavigation();
  const [groupUser, setGroupUser] = useState<string>();
  const [user, setUser] = useState<string>("");
  const groupURL =
    "https://truongxuaapp.online/api/v1/groups?pageNumber=0&pageSize=0";
  const alumniURL =
    "https://truongxuaapp.online/api/v1/alumni?pageNumber=0&pageSize=0";
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
            Nhóm
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              fontWeight: "400",
              marginRight: 10,
            }}
          >
            Trang Chủ/Nhóm
          </Text>
        </View>
        {/* ========HEADER========= */}
        <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
          <View style={style.line} />
          <Text style={style.header}>Nhóm Của Tôi</Text>
        </View>
        {/*=====FlatList Group=========  */}
        <View>
          <FlatList
            keyExtractor={({ id }, index) => id}
            data={groups}
            numColumns={2}
            renderItem={({ item, index }) => {
              if (groupUser == item.id) {
                return (
                  <View
                    style={{
                      padding: 10,
                      marginBottom: 20,
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Chi Tiết Nhóm", {
                          id: item.id,
                          numberAlumni: countAlumniInGroup(item.id),
                        })
                      }
                    >
                      <Image
                        source={{ uri: item.backgroundImg }}
                        style={{
                          height: 120,
                          width: 190,
                          borderRadius: SIZES.radius,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 8,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.h3,
                          fontSize: 14,
                          color: COLORS.black,
                          fontWeight: "500",
                          marginLeft: 8,
                          width: 145,
                          overflow: "hidden",
                        }}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Image
                        source={icons.user2}
                        style={{
                          height: 14,
                          width: 14,
                          marginLeft: 5,
                        }}
                      />
                      <Text
                        style={{ ...FONTS.h4, fontSize: 16, marginLeft: 2 }}
                      >
                        {countAlumniInGroup(item.id)}
                      </Text>
                    </View>
                  </View>
                );
              }
              return null;
            }}
          />
          {/* ========HEADER========= */}
          <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
            <View style={style.line} />
            <Text style={style.header}>Đã Tham Gia Nhóm</Text>
            <FlatList
              keyExtractor={({ id }, index) => id}
              data={JOINED_GROUP}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={item.img}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ ...FONTS.h4, fontSize: 18 }}>
                          {item.name}
                        </Text>
                        <Image
                          source={require("../../assets/icons/check.png")}
                          style={{ width: 14, height: 14, marginTop: 6 }}
                        />
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: "#F62B53",
                            position: "relative",
                            left: 14,
                            bottom: 18,
                          }}
                        >
                          Tham Gia
                        </Text>
                      </View>
                    </View>
                    <View style={style.linegroup} />
                  </View>
                );
              }}
            />
          </View>
          {/* =========SUggested Group======== */}
          <View style={{ marginHorizontal: 16 }}>
            <View style={style.line} />
            <Text style={style.header}>Suggested Groups </Text>
            <FlatList
              keyExtractor={({ id }, index) => id}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              data={SUGGESTED}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={{ marginLeft: 20 }}
                      onPress={() => navigation.navigate("Chi Tiết Nhóm")}
                    >
                      <Image
                        source={item.img}
                        style={{ height: 60, width: 60, borderRadius: 30 }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        marginLeft: 4,
                        marginTop: 6,
                        fontSize: 18,
                      }}
                    >
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: 20,
                        height: 30,
                        width: 90,
                        backgroundColor: "#088dcd",
                        borderRadius: 12,
                        marginTop: 4,
                      }}
                      onPress={() => navigation.navigate("Chi Tiết Nhóm")}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontWeight: "500",
                          fontSize: 18,
                          textAlign: "center",
                          paddingTop: 3,
                        }}
                      >
                        Tham gia
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  header: {
    ...FONTS.h3,
    color: COLORS.black,
    fontWeight: "500",
    fontSize: 20,
    position: "relative",
    bottom: 24,
    left: 8,
  },
  line: {
    height: 22,
    width: 4,
    backgroundColor: "#088dcd",
  },
  linegroup: {
    height: 1,
    width: 350,
    backgroundColor: COLORS.gray,
    marginVertical: 12,
    opacity: 0.2,
  },
});
export default Group;
