/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
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
import { Constants } from "expo-constants";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import { updatePostfix } from "typescript";
import * as ImagePicker from "expo-image-picker";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const EditPostGroup: React.FC = () => {
  //======begin call api put=======
  const baseUrl = "http://20.188.111.70:12348";
  // const [id, setId] = useState()
  const route = useRoute();
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [content, setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [createAt, setCreateAt] = useState(dateCreate);
  const [modifiedAt, setModifiedAt] = useState(new Date());
  const [status, setStatus] = useState(true);
  const navigation = useNavigation();
  const [groupId, setGroupId] = useState(33);
  const [isLoading, setIsLoading] = useState(false);
  const [authorize, setAuthorize] = useState();
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
    featchPosts(headers);
    featchImageEvent(headers);
  };

  const [listImg, setListImg] = useState(Array);
  const [arrayImg, setArrayImg] = useState(Array);
  const featchImageEvent = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/images/postid?postId=" +
          route.params.id,
        { headers }
      );
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
          arrayImg.push(response.data[i].imageUrl);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeImageInList = (index) => {
    arrayImg.splice(index, 1);
  };

  async function featchPosts(headers) {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/posts/" + route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setContent(response.data.content);
        setAlumniId(response.data.alumniId);
        setGroupId(response.data.groupId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitFormHandler = async (headers) => {
    if (!content.trim) {
      alert("Không được để trống");
      return;
    } else {
      try {
        const reponse = await axios.put(
          "https://truongxuaapp.online/api/v1/posts?id=" + route.params.id,
          {
            content,
            createAt,
            status,
            alumniId,
            groupId,
          },
          { headers }
        );
        if (reponse.status === 200) {
          alert("Cập nhật thành công");
          navigation.navigate("Chi Tiết Nhóm", {
            id: groupId,
            numberAlumni: route.params.numberAlumni,
          });
        }
      } catch (error) {
        alert("Cập nhật không thành công");
      }
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
      arrayImg.push(result.uri);
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
  const updateImages = async (headers, id) => {
    try {
      const response = await axios.put(
        "https://truongxuaapp.online/api/v1/images?",
        {
          postId: id,
          imageUrl: await uploadImage(image),
        },
        { headers }
      );
      if (response.status === 200) {
        alert("Tạo Bài Đăng Thành Công");
        navigation.navigate("GroupDetails", {
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
            Sửa Bài Đăng
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
        <View style={{ marginTop: 20 }}>
          {/* =======begin  */}
          <TouchableOpacity onPress={pickImg} style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/imageGallery.png")}
            />
            <Text style={{ marginLeft: 10 }}>Chọn hình ảnh</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}
          >
            <FlatList
              numColumns={50}
              data={arrayImg}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => removeImageInList(index)}
                      style={{
                        position: "relative",
                        bottom: -20,
                        zIndex: 10,
                        alignSelf: "flex-end",
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/error.png")}
                        style={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: item }}
                      style={{ width: 200, height: 200, marginRight: 10 }}
                    />
                  </View>
                );
              }}
            />
          </ScrollView>
          {/* ======End ===== */}
        </View>
        <TouchableOpacity
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
export default EditPostGroup;
