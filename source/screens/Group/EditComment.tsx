/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const EditComment: React.FC = () => {
  //======begin call api put=======
  const route = useRoute();
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [content, setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [createAt, setCreateAt] = useState(dateCreate);
  const [modifiedAt, setModifiedAt] = useState(dateCreate);
  const [status, setStatus] = useState(true);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [authorize, setAuthorize] = useState();
  const [postId, setPostId] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setAlumniId(objUser.Id);
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    featchComment(headers);
  };

  const featchComment = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/posts/comments/" + route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setContent(response.data.content);
        setPostId(response.data.postId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitFormHandler = async (headers) => {
    if (!content.trim) {
      alert("Không được để trống");
      return;
    } else {
      try {
        const reponse = await axios.put(
          "https://truongxuaapp.online/api/v1/posts/comments/" +
            route.params.id,
          {
            alumniId,
            postId,
            content,
            createAt,
            status,
          },
          { headers }
        );
        if (reponse.status === 200) {
          alert("Cập nhật thành công");
          navigation.navigate("Chi Tiết Bài Đăng", { id: postId });
        }
      } catch (error) {
        alert("Cập nhật không thành công");
      }
    }
  };

  useEffect(() => {
    tokenForAuthor();
  }, []);
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
            Sửa bình luận
          </Text>
        </View>
        <View>
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
            placeholder="Bạn đang nghĩ gì"
            value={content}
            editable={!isLoading}
            onChangeText={(content) => setContent(content)}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 40 }}
          onPress={() => {
            onSubmitFormHandler(authorize);
          }}
          disabled={isLoading}
        >
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              padding: 10,
              borderRadius: 20,
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
              Sửa Bài Đăng
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditComment;
