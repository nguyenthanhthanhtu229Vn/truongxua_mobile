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
import { useNavigation, useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";

const CreatePostInGroup: React.FC = () => {
  //========  begin call api post =======
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const baseUrl = "http://20.188.111.70:12348";
  const route = useRoute();
  const [content, setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [createAt, setCreateAt] = useState(dateCreate);
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const [idUser, setIdUser] = useState();
  const [authorize, setAuthorize] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setAlumniId(objUser.Id);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
  };

  const OnChangeContentHandler = (content) => {
    setContent(content);
  };
  const onSubmitFormHandler = (headers) => {
    if (!content.trim()) {
      alert("Không được để trống ");
      return;
    } else {
      createPost(headers);
    }
  };

  // Call API Create Post
  const createPost = async (headers) => {
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/v1/posts`,
        { alumniId, content, createAt, status, groupId: route.params.id },
        { headers }
      );
      if (response.status === 200) {
        setContent("");
        if (image != null) {
          await createImgForPost(headers, response.data);
        } else {
          navigation.navigate("Chi Tiết Nhóm", {
            id: route.params.id,
            numberAlumni: route.params.numberAlumni,
          });
          alert("Tạo Bài Đăng Thành Công");
        }
      }
    } catch (error) {
      alert("Đã Xảy Ra Lỗi !!");
    }
  };
  //Pick Image
  const [image, setImage] = useState(null);

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

  const uploadImage = async (imgPick) => {
    let filename = imgPick.split("/").pop();
    let body = new FormData();
    body.append("image", {
      uri: imgPick,
      name: filename,
      type: "image/jpeg",
    });
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload?key=8ce611088e16144c16f12e63289df341",
        data: body,
      });
      if (response.status == 200) {
        return response.data.data.display_url;
      }
    } catch (err) {
      alert(err);
    }
  };

  // Call Api Post Images
  const createImgForPost = async (headers, id) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/images",
        {
          postId: id,
          imageUrl: await uploadImage(image),
        },
        { headers }
      );
      if (response.status === 200) {
        alert("Tạo Bài Đăng Thành Công");
        navigation.navigate("Chi Tiết Nhóm", {
          id: route.params.id,
          numberAlumni: route.params.numberAlumni,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tokenForAuthor();
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  });
  //=======End call api create post =========
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
            Tạo Bài Viết
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
            onChangeText={OnChangeContentHandler}
          />
        </View>
        <View style={{ flexDirection: "row", margin: 20 }}>
          {/* =======begin  */}
          <View>
            <TouchableOpacity onPress={pickImg}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/icons/imageGallery.png")}
              />
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
          {/* ======End ===== */}
          <Image
            style={{ width: 25, height: 25, marginLeft: 20 }}
            source={require("../../assets/icons/feedback.png")}
          />
          <Image
            style={{ width: 25, height: 25, marginLeft: 20 }}
            source={require("../../assets/icons/menu.png")}
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
    </View>
  );
};
export default CreatePostInGroup;
