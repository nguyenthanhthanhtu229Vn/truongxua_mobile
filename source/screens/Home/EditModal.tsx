/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Modal,
  Pressable,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const EditPostModal: React.FC = () => {
  const route = useRoute();
  //======begin call api put=======
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [modifiedAt, setModifiedAt] = useState(dateCreate);
  const [createAt, setCreateAt] = useState(dateCreate);
  const [schoolId, setSchoolId] = useState();
  const navigation = useNavigation();

  const [authorize, setAuthorize] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setSchoolId(objUser.SchoolId);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
  };

  const [isLoading, setIsLoading] = useState(false);
  const updateValue = async () => {
    setTitle(route.params.item.title);
    setContent(route.params.item.content);
  };
  useEffect(() => {
    updateValue();
    tokenForAuthor();
  }, []);

  const onSubmitFormHandler = async (headers) => {
    if (!content.trim) {
      alert("Không được để trống");
      return;
    }
    if (!title.trim) {
      alert("Không được để trống");
      return;
    }
    try {
      const response = await axios.put(
        "https://truongxuaapp.online/api/v1/news?id=" + route.params.item.id,
        {
          title,
          content,
          createAt,
          schoolId,
        },
        { headers }
      );
      if (response.status === 200) {
        alert("Sửa Bài Viết Thành Công");
        setContent("");
        setTitle("");
        navigation.navigate("Trang Chủ");
      }
    } catch (error) {
      alert("Đã Có Lỗi Xảy Ra !! Vui Lòng Kiểm Tra Lại !!");
    }
  };
  //======end call api put=======
  return (
    <View style={{ flex: 1, position: "absolute", width: "100%" }}>
      <View
        style={{
          zIndex: 10,
          backgroundColor: "white",
          justifyContent: "center",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View>
          {/* ======Title===== */}
          <TextInput
            multiline
            placeholder="Tiêu Đề"
            editable={!isLoading}
            value={title}
            onChangeText={(title) => setTitle(title)}
            style={style.title}
          />
          {/* =====Content===== */}
          <TextInput
            style={{
              borderRadius: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              backgroundColor: "#f5f4f9",
              padding: 10,
              height: 100,
            }}
            scrollEnabled
            multiline
            placeholder="Nội Dung Bài Viết"
            value={content}
            editable={!isLoading}
            onChangeText={(content) => setContent(content)}
          />
        </View>
        <TouchableOpacity onPress={() => onSubmitFormHandler(authorize)}>
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              padding: 10,
              borderRadius: 20,
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Sửa Bài Viết
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    borderRadius: 10,
    borderColor: "#d0d0d0",
    borderWidth: 1,
    backgroundColor: "#f5f4f9",
    padding: 10,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  mL: {
    marginLeft: 20,
  },
});

export default EditPostModal;
