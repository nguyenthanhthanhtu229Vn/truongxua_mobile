/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { Text, View, Image, TextInput, Modal, Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { Constants } from "expo-constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const EditPostModal: React.FC = () => {
  //======begin call api put=======
  const baseUrl = "http://20.188.111.70:12348";
  // const [id, setId] = useState(267);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [modifiedAt, setModifiedAt] = useState(new Date());

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const OnChangeContentHandler = (content) => {
    setContent(content);
  };
  const onSubmitFormHandler = async (id) => {
    if (!content.trim) {
      alert("Không được để trống");
      return;
    }
    if (!title.trim) {
      alert("Không được để trống");
      return;
    }
    axios({
      url: `${baseUrl}/api/v1/news?id=59`,
      method: "PUT",
      data: {
        title,
        content,
        modifiedAt,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Sửa Bài Viết Thành Công");
          setContent("");
          setTitle("");
          navigation.navigate("Trang Chủ");
        }
      })
      .catch((error) => {
        alert("Đã Có Lỗi Xảy Ra !! Vui Lòng Kiểm Tra Lại !!");
      });
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
            Sửa Bài Viết
          </Text>
        </View>
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
            onChangeText={OnChangeContentHandler}
          />
        </View>
        <View style={{ flexDirection: "row", margin: 20 }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/icons/imageGallery.png")}
          ></Image>
          <Image
            style={{ width: 25, height: 25, marginLeft: 20 }}
            source={require("../../assets/icons/feedback.png")}
          ></Image>
          <Image
            style={{ width: 25, height: 25, marginLeft: 20 }}
            source={require("../../assets/icons/menu.png")}
          ></Image>
        </View>
        <TouchableOpacity onPress={onSubmitFormHandler} disabled={isLoading}>
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
              Sửa Bài Viết
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditPostModal;
