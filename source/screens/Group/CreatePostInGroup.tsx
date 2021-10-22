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
    console.log(result);
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

const CreatePostInGroup: React.FC = () => {
  //========  begin call api post =======
  const baseUrl = "http://20.188.111.70:12348";
  const [content, setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [createAt, setCreateAt] = useState(new Date());
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const OnChangeContentHandler = (content) => {
    setContent(content);
  };
  const onSubmitFormHandler = async (event) => {
    if (!content.trim()) {
      alert("Please Write something");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/v1/posts`, {
        alumniId,
        content,
        createAt,
        status,
      });
      if (response.status === 200) {
        setContent("");
        alert("Creat Post Success");
        setTimeout(function () {
          setModalVisible(false);
        }, 2);
      }
    } catch (error) {
      alert("An error has occurred");
    }
  };
  //=======End call api create post =========
  return (
    <View style={{ flex: 1, position: "absolute", width: "100%" }}>
      <Modal
        style={{ backgroundColor: "black", opacity: 0.5 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            zIndex: 10,
            backgroundColor: "white",
            justifyContent: "center",
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
            borderRadius: 10,
            marginTop: 50,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
              Tạo Bài Viết
            </Text>
            <TouchableOpacity>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/icons/error.png")}
                />
              </Pressable>
            </TouchableOpacity>
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
              placeholder="Write something"
              value={content}
              editable={!isLoading}
              onChangeText={OnChangeContentHandler}
            />
          </View>
          <View style={{ flexDirection: "row", margin: 20 }}>
            {/* =======begin  */}
            <ImagePost />
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
                Đăng Bài
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ==================================== */}

      <View
        style={{
          zIndex: 1,
          borderRadius: 10,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          backgroundColor: "#fafafa",
          padding: 10,
          margin: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
          Tạo Bài Viết
        </Text>
        <TouchableOpacity>
          <Pressable onPress={() => setModalVisible(true)}>
            <View
              style={{
                borderRadius: 250,
                borderColor: "#d0d0d0",
                borderWidth: 1,
                backgroundColor: "#fff",
                padding: 10,
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 15,
                  height: 15,
                  alignItems: "center",
                  marginTop: 3,
                  marginLeft: 5,
                }}
                source={require("../../assets/icons/pencil.png")}
              />
              <Text style={{ fontSize: 15, color: "#808080", marginLeft: 10 }}>
                Tạo Bài Viết
              </Text>
            </View>
          </Pressable>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/imageGallery.png")}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              Ảnh/Video
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../assets/icons/feedback.png")}
            ></Image>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              Cảm Xúc/Hoạt Động
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CreatePostInGroup;
