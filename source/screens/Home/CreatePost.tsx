/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Modal,
  Pressable,
  Button,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
const ImagePost = () => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, []);
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={pickImg}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../../assets/icons/imageGallery.png")}
        />
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );
};

const CreatePost: React.FC = () => {
  //========  begin call api post =======
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [adminId, setAdminId] = useState(1);
  const [schoolId, setSchoolId] = useState();
  const [createAt, setCreateAt] = useState(dateCreate);
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [authorize, setAuthorize] = useState();
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
    setSchoolId(objUser.SchoolId);
  };

  useEffect(() => {
    tokenForAuthor();
  }, []);
  const OnChangeContentHandler = (content) => {
    setContent(content);
  };
  const OnChangeTitleHandler = (title) => {
    setContent(content);
  };
  const onSubmitFormHandler = async (headers) => {
    if (!content.trim()) {
      alert("Không được bỏ trống");
      return;
    }
    if (!title.trim()) {
      alert("Không được bỏ trống ");
      return;
    }
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/v1/news`,
        {
          schoolId,
          adminId,
          title,
          content,
          createAt,
          status,
        },
        { headers }
      );
      if (response.status === 200) {
        setContent("");
        setTitle("");
        alert("Tạo Bài Viết Thành Công");
        navigation.navigate("Trang Chủ");
      }
    } catch (error) {
      alert("Có lỗi xảy ra ! Vui lòng kiểm tra lại");
    }
  };
  //=======End call api create post =========
  return (
    <View style={{ flex: 1, position: "absolute", width: "100%" }}>
      <View
        style={{
          zIndex: 10,
          backgroundColor: "white",
          justifyContent: "center",
          marginLeft: 10,
          marginRight: 10,
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
            style={{
              borderRadius: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              backgroundColor: "#f5f4f9",
              padding: 10,
              height: 50,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
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
            placeholder="Viết Nội Dung"
            value={content}
            editable={!isLoading}
            onChangeText={OnChangeContentHandler}
          />
        </View>
        <TouchableOpacity
          onPress={() => onSubmitFormHandler(authorize)}
          disabled={isLoading}
        >
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              padding: 10,
              borderRadius: 20,
              marginTop: 30,
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
              Đăng Bài
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ==================================== */}
    </View>
  );
};
export default CreatePost;
