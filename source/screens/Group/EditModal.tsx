/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Constants } from 'expo-constants';
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const EditPostGroup: React.FC = () => {
  //======begin call api put=======
  const baseUrl = 'http://20.188.111.70:12348'
  // const [id, setId] = useState()
  const [content,  setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [modifiedAt, setModifiedAt] = useState(new Date());
  const [status, setStatus] = useState(true);
  const navigation = useNavigation();
  const [groupId, setGroupId] = useState(33);
  const [isLoading, setIsLoading] = useState(false);
  const OnChangeContentHandler = (content) =>{
    setContent(content);
  }
  const onSubmitFormHandler = async () => {
    if(!content.trim){
      alert('Không được để trống')
      return;
    }
    axios( {
        url : `${baseUrl}/api/v1/posts?id=292`,
        method: 'PUT',
        data: {
            groupId,
            alumniId,
            content,
            status,
            modifiedAt
          }
    }
    )
    .then((response) => {
        if(response.status === 200){
            alert('Sửa Bài Đăng Thành Công');
            setContent('');
            navigation.navigate('Group')
          }
    })
    .catch((error) => {
        alert('Đã Có Lỗi Xảy Ra!!');
    })
    }
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
                placeholder="Write something"
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
                Sửa Bài Đăng
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    )
  };
export default EditPostGroup;
