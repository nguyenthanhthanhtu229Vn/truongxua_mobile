import { useIsFocused, useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { COLORS } from "../../constant";

const Member = () => {
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [authorize, setAuthorize] = useState();
  const [idUser, setIdUser] = useState();
  const [idSchool, setIdSchool] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    setIdSchool(objUser.SchoolId);
    setIdUser(objUser.Id);
    await featchAlumni(headers, objUser.SchoolId, objUser.Id);
  };
  const [alumni, setAlumni] = useState<string>("");

  const featchAlumni = async (headers, id, myId) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/alumni/schoolid?schoolId=" + id,
        { headers }
      );
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
          let statusFollow = await checkFollowed(
            headers,
            response.data[i].id,
            myId
          );
          response.data[i].follow = stateFollow[statusFollow].content;
        }
        setAlumni(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call API checkFollowed
  const [stateFollow, setStateFollow] = useState([
    {
      content: "Kết nối",
      status: true,
    },
    {
      content: "Đã gửi lời mời",
      status: false,
    },
    {
      content: "Đã kết nối",
      status: true,
    },
    {
      content: "Chờ xác nhận",
      status: false,
    },
  ]);

  const [listFollow, setListFollow] = useState(undefined);

  const checkFollowed = async (headers, id, myId) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/followers/checkfollowed?alumniId=" +
          myId +
          "&followerId=" +
          id,
        { headers }
      );
      if (response.status === 200) {
        let check = await getFollowWaiting(headers, id, myId);
        if (check == 0) {
          return response.data;
        } else {
          return 3;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowWaiting = async (headers, id, myId) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/followers/Followed/" + myId,
        { headers }
      );
      if (response.status === 200) {
        if (response.data.length == 0) {
          return 0;
        } else {
          return await getFollowWaitingSwap(headers, id, response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowWaitingSwap = async (headers, id, followed) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/followers/Follower/" + id,
        { headers }
      );
      if (response.status === 200) {
        if (response.data.length == 0) {
          return 0;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < followed.length; j++) {
              console.log(followed);
              if (
                followed[j].id == response.data[i].id &&
                followed[j].status == false
              ) {
                return 1;
                break;
              }
              return 0;
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeButtonFollow = (numFollow, idFollow, headers, myId) => {
    if (numFollow == "Kết nối") {
      createConnect(headers, idFollow);
    } else if (numFollow == "Đã gửi lời mời") {
      Alert.alert("Hủy", "Bạn muốn bỏ lời mời theo dõi này", [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => getFollow(myId, idFollow, headers, 1),
        },
      ]);
    } else if (numFollow == "Đã kết nối") {
      Alert.alert("Hủy", "Bạn muốn bỏ kết nối người này", [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => getFollow(myId, idFollow, headers, 2),
        },
      ]);
    } else if (numFollow == "Chờ xác nhận") {
      Alert.alert("Đồng ý", "Bạn đồng ý kết nối người này", [
        {
          text: "Từ chối",
          onPress: () => getFollow(idFollow, myId, headers, 1),
        },
        {
          text: "Đồng ý",
          onPress: () => getFollow(idFollow, myId, headers, 3),
        },
      ]);
    }
  };

  const getFollow = async (myId, idFollow, headers, status) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/followers/Follower/" + myId,
        { headers }
      );
      if (response.status === 200) {
        getFollowed(myId, idFollow, headers, response.data, status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowed = async (myId, idFollow, headers, follow, status) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/followers/Followed/" + idFollow,
        { headers }
      );
      if (response.status === 200) {
        if (status == 1) {
          deleteFollow(headers, follow, response.data);
        } else if (status == 2) {
          deleteFollow2Site(myId, idFollow, headers, follow, response.data);
        } else {
          confirmConnect(headers, follow, response.data, idFollow, myId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // With reponse 0
  const createConnect = async (headers, idFollow) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/followers",
        {
          alumniId: idUser,
          followerAlumni: idFollow,
          status: false,
        },
        { headers }
      );
      if (response.status === 200) {
        await featchAlumni(headers, idSchool, idUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // With response 1
  const deleteFollow = async (headers, follow, followed) => {
    let idDeleteFollow = 0;
    for (let i = 0; i < follow.length; i++) {
      for (let j = 0; j < followed.length; j++) {
        if (followed[j].id == follow[i].id) {
          idDeleteFollow = followed[j].id;
          break;
        }
      }
    }
    try {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/followers/" + idDeleteFollow,
        { headers }
      );
      if (response.status === 200) {
        await featchAlumni(headers, idSchool, idUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // With response 2
  const deleteFollow2Site = async (
    myId,
    idFollow,
    headers,
    follow,
    followed
  ) => {
    let idDeleteFollow = 0;
    for (let i = 0; i < follow.length; i++) {
      for (let j = 0; j < followed.length; j++) {
        if (followed[j].id == follow[i].id) {
          idDeleteFollow = followed[j].id;
          break;
        }
      }
    }
    try {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/followers/" + idDeleteFollow,
        { headers }
      );
      if (response.status === 200) {
        getFollow(idFollow, myId, headers, 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // With response 3
  const confirmConnect = async (headers, follow, followed, idFollow, myId) => {
    let idConfirmFollow = 0;
    for (let i = 0; i < follow.length; i++) {
      for (let j = 0; j < followed.length; j++) {
        if (followed[j].id == follow[i].id) {
          idConfirmFollow = followed[j].id;
          break;
        }
      }
    }
    try {
      const response = await axios.put(
        "https://truongxuaapp.online/api/v1/followers?id=" + idConfirmFollow,
        {
          alumniId: myId,
          followerAlumni: idFollow,
          status: true,
        },
        { headers }
      );
      console.log(response.status);
      if (response.status === 200) {
        await createConnectSwap(headers, myId);
        // featchAlumni(headers, idSchool, idUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createConnectSwap = async (headers, idFollow) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/followers",
        {
          alumniId: idUser,
          followerAlumni: idFollow,
          status: true,
        },
        { headers }
      );
      if (response.status === 200) {
        await featchAlumni(headers, idSchool, idUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tokenForAuthor();
  }, [isFocused]);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 30,
        padding: 20,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: "#E1E8EC",
        borderRadius: 6,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            height: 22,
            width: 4,
            backgroundColor: "#088dcd",
            marginBottom: 6,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 20,
            fontWeight: "600",
            color: COLORS.black,
            marginBottom: 8,
          }}
        >
          Thành Viên
        </Text>
      </View>
      {/* ======su kien */}
      <View>
        <FlatList
          extraData={visible}
          horizontal
          data={alumni}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) => {
            if (item.id != idUser) {
              return (
                <View
                  style={{
                    backgroundColor: "#f7f4f4",
                    padding: 20,
                    width: 180,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    marginBottom: 20,
                    borderWidth: 0.5,
                    borderColor: "#E1E8EC",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Hồ Sơ", { idProfile: item.id });
                    }}
                  >
                    <Image
                      source={{ uri: item.img }}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 8,
                        marginLeft: 24,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: COLORS.black,
                        fontWeight: "400",
                        fontSize: 16,
                        height: 40,
                        marginTop: 5,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.blue,
                      padding: 10,
                      marginTop: 16,
                      borderRadius: 6,
                    }}
                    onPress={() =>
                      changeButtonFollow(
                        item.follow,
                        item.id,
                        authorize,
                        idUser
                      )
                    }
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLORS.white,
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: 4,
                      }}
                    >
                      {item.follow}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          }}
        />
      </View>
    </View>
  );
};

export default Member;
