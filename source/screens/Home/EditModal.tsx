/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { Text, View, Image, TextInput, Modal, Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const EditPostModal: React.FC = () => {
  const route = useRoute();
  //======begin call api put=======
  const baseUrl = "http://20.188.111.70:12348";
  // const [id, setId] = useState(267);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [modifiedAt, setModifiedAt] = useState(new Date());

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const updateValue = async () => {
    setTitle(route.params.item.title);
    setContent(route.params.item.content);
  };
  useEffect(() => {
    updateValue();
  }, []);

  const onSubmitFormHandler = async () => {
    if (!content.trim) {
      alert("Không được để trống");
      return;
    }
    if (!title.trim) {
      alert("Không được để trống");
      return;
    }
    axios({
      url: `${baseUrl}/api/v1/news?id=` + route.params.item.id,
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
        <View style={{ flexDirection: "row", margin: 20 }}>
          <Image
            style={style.icon}
            source={require("../../assets/icons/imageGallery.png")}
          ></Image>
          <Image
            style={[style.icon, style.mL]}
            source={require("../../assets/icons/feedback.png")}
          ></Image>
          <Image
            style={[style.icon, style.mL]}
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
