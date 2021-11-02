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
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Constants } from "expo-constants";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import { updatePostfix } from "typescript";
import * as ImagePicker from "expo-image-picker";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const EditBackgroundGroup: React.FC = () => {
  // const [id, setId] = useState()
  const route = useRoute();
  const navigation = useNavigation();
  const [groupId, setGroupId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [authorize, setAuthorize] = useState();
  const [check, setCheck] = useState(false);

  //
  const [groupDetail, setGroupDetail] = useState();
  const [backgroundImg, setBackgroundImg] = useState();
  const [avataImg, setAvataImg] = useState();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    featchGroupDetail(headers);
  };

  async function featchGroupDetail(headers) {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/groups/" + route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setGroupDetail(response.data);
        setAvataImg(response.data.avataImg);
        setBackgroundImg(response.data.backgroundImg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitFormHandler = async (headers) => {
    try {
      const reponse = await axios.put(
        "https://truongxuaapp.online/api/v1/groups?id=" + route.params.id,
        {
          name: groupDetail.name,
          schoolYearId: groupDetail.schoolYearId,
          policy: groupDetail.policy,
          backgroundImg: await uploadImage(backgroundImg),
          avataImg: await uploadImage(avataImg),
          description: groupDetail.description,
          info: groupDetail.info,
          groupAdminId: groupDetail.groupAdminId,
        },
        { headers }
      );
      if (reponse.status === 200) {
        alert("Cập nhật thành công");
        navigation.navigate("Chi Tiết Nhóm", {
          id: route.params.id,
          numberAlumni: route.params.numberAlumni,
        });
      }
    } catch (error) {
      alert("Cập nhật không thành công");
    }
  };

  //Pick Image

  const pickImgAvt = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setAvataImg(result.uri);
    }
  };

  const pickImgBackground = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setBackgroundImg(result.uri);
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

  useEffect(() => {
    tokenForAuthor();
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, [check]);
  //======end call api put=======
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          zIndex: 10,
          backgroundColor: "white",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
            Cập nhật hình ảnh nhóm của bạn
          </Text>
        </View>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: backgroundImg }}
            style={{ width: width, height: 250 }}
          />
        </View>
        <Image
          source={{ uri: avataImg }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 80,
            position: "absolute",
            left: 20,
            borderWidth: 5,
            borderColor: "white",
          }}
        />
        <View style={{ marginTop: 20, padding: 10 }}>
          {/* =======begin  */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={pickImgBackground}
              style={{ flexDirection: "row" }}
            >
              <Text
                style={{
                  backgroundColor: "purple",
                  padding: 10,
                  width: 180,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Thay đổi ảnh bìa
              </Text>
            </TouchableOpacity>
            {/* =======begin  */}
            <TouchableOpacity
              onPress={pickImgAvt}
              style={{ flexDirection: "row" }}
            >
              <Text
                style={{
                  marginLeft: 16,
                  padding: 10,
                  width: 180,
                  backgroundColor: "orange",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Thay đổi ảnh đại diện
              </Text>
            </TouchableOpacity>
          </View>
          {/* ======End ===== */}
        </View>
        <TouchableOpacity
          onPress={() => {
            onSubmitFormHandler(authorize);
          }}
          disabled={isLoading}
          style={{ padding: 10 }}
        >
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              padding: 10,
              borderRadius: 20,
              marginTop: 20,
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
              Cập nhật hình ảnh
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditBackgroundGroup;
