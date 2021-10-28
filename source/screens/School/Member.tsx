import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { COLORS } from "../../constant";

const Member = (idSchool) => {
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
    featchAlumni(headers);
  };
  const [alumni, setAlumni] = useState<string>("");
  const alumniURL =
    "https://truongxuaapp.online/api/v1/alumni?pageNumber=0&pageSize=0";
  const featchAlumni = async (headers) => {
    try {
      const response = await axios.get(alumniURL, { headers });
      if (response.status === 200) {
        setAlumni(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tokenForAuthor();
  });
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
          horizontal
          data={alumni}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) => {
            if (item.schoolId == idSchool.idSchool) {
              return (
                <View
                  style={{
                    backgroundColor: "#f7f4f4",
                    height: 200,
                    width: 150,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    marginBottom: 20,
                    borderWidth: 0.5,
                    borderColor: "#E1E8EC",
                  }}
                >
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      height: 100,
                      width: 100,
                      marginLeft: 24,
                      marginVertical: 8,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: COLORS.black,
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.blue,
                      height: 30,
                      width: 120,
                      marginLeft: 10,
                      marginTop: 16,
                      borderRadius: 6,
                    }}
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
                       Theo Dõi
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
