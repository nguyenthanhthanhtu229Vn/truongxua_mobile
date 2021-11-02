import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  AsyncStorage,
  RefreshControl,
  Alert,
  KeyboardAvoidingView,
  PlatformColor,
  Platform,
} from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { COLORS, FONTS, icons, SIZES } from "../../constant";

const GroupPostDetail = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [post, setPost] = useState<string>("");
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [visible, setVisible] = useState(false);
  // ========= Start Modal=========
  const ModalPoup = ({
    visible,
    children,
  }: {
    visible: any;
    children: any;
  }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          delay: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={style.modalBackGround}>
          <Animated.View
            style={[
              style.modalContainer,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  // Call Post API
  async function featchPosts(headers) {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/posts/" + route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCountComment = (postId) => {
    let count = 0;
    for (let i = 0; i < comment.length; i++) {
      if (comment[i].postId == postId) {
        count++;
      }
    }
    return count;
  };
  // Call Img API
  const [listImg, setListImg] = useState<string>("");
  const featchImagePost = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/images?pageNumber=0&pageSize=0",
        { headers }
      );
      if (response.status === 200) {
        setListImg(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call Api Alumni
  const [alumni, setAlumni] = useState<string>("");
  const alumniURL =
    "https://truongxuaapp.online/api/v1/alumni?pageNumber=0&pageSize=0";
  const featchAlumni = async (headers) => {
    try {
      const response = await axios.get(alumniURL, { headers });
      if (response.status === 200) {
        setAlumni(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Avt and Name for Post
  const getAvtAlumni = (alumniId) => {
    let avt = "";
    for (let i = 0; i < alumni.length; i++) {
      if (alumni[i].id == alumniId) {
        avt = alumni[i].img;
        break;
      }
    }
    return avt;
  };

  const getNameAlumni = (alumniId) => {
    let name = "";
    for (let i = 0; i < alumni.length; i++) {
      if (alumni[i].id == alumniId) {
        name = alumni[i].name;
        break;
      }
    }
    return name;
  };

  // ======Call Api Delete Comment======
  const confirmDeleteComment = async (id, headers) => {
    Alert.alert("Xóa", "Bạn muốn xóa bài bình luận này", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "Đồng ý", onPress: () => deleteComment(id, headers) },
    ]);
  };

  const deleteComment = async (id, headers) => {
    try {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/posts/comments/" + id,
        { headers }
      );
      if (response.status === 200) {
        await featchComment(authorize);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //=====Call Api Comment=======
  const [comment, setComment] = useState<string>("");
  const commentURL =
    "https://truongxuaapp.online/api/v1/posts/comments/postid?postId=" +
    route.params.id +
    "&sort=desc";
  const featchComment = async (headers) => {
    try {
      const response = await axios.get(commentURL, { headers });
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ======Format Date====
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      " tháng " +
      String(day.getMonth() + 1).padStart(2, "0") +
      ", " +
      day.getFullYear() +
      " lúc " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };
  const formatDateComment = (date) => {
    const day = new Date(date);
    return (
      "Lúc " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear() +
      ", " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };

  // Get My Info
  const [alumniId, setAlumniId] = useState<string>("");
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
    await featchPosts(headers);
    await featchImagePost(headers);
    await featchAlumni(headers);
    await featchComment(headers);
  };

  // Create Comment
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [content, setContent] = useState<string>("");
  const [createAt, setCreateAt] = useState(dateCreate);
  const [modifiedAt, setModifiedAt] = useState(new Date());
  const [postId, setPostId] = useState<string>();
  const [status, setStatus] = useState<boolean>(true);
  const validateComment = () => {
    if (content.trim() == "") {
      alert("Không được nhập trống");
    } else {
      createComment(authorize);
    }
  };
  const createComment = async (headers) => {
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/v1/posts/comments`,
        {
          alumniId,
          postId,
          content,
          createAt,
          status,
        },
        { headers }
      );
      if (response.status === 200) {
        await featchComment(authorize);
        setContent("");
      }
    } catch (error) {
      alert("Ghi bình luận không thành công");
    }
  };
  useEffect(() => {
    setPostId(route.params.id);
    tokenForAuthor();
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({
        ios: () => 60,
        android: () => 200,
      })()}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              featchComment(authorize),
                featchPosts(authorize),
                featchImagePost(authorize),
                featchAlumni(authorize);
            }}
          />
        }
        style={{
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: COLORS.white2,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: getAvtAlumni(post.alumniId) }}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: SIZES.largeTitle,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.blue,
                    marginLeft: 4,
                    ...FONTS.h3,
                    fontWeight: "500",
                    width: 280,
                  }}
                >
                  {getNameAlumni(post.alumniId)}
                </Text>
                {/* ====begin modal====== */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ModalPoup visible={visible}>
                    <View style={{ alignItems: "center" }}>
                      <View style={style.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                          <Image
                            source={require("../../assets/icons/error.png")}
                            style={{ height: 30, width: 30 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Sửa Bài Đăng", {
                            id: post.id,
                          })
                        }
                      >
                        <Image
                          source={require("../../assets/icons/edit.png")}
                          style={{
                            height: 20,
                            width: 20,
                            marginVertical: 10,
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        />
                      </TouchableOpacity>
                      <Text>Edit Post</Text>
                    </View>
                    {/* delete */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => onSubmitFormHandler(post.id)}
                      >
                        <Image
                          source={require("../../assets/icons/delete.png")}
                          style={{
                            height: 20,
                            width: 20,
                            marginVertical: 10,
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        />
                      </TouchableOpacity>
                      <Text>Delete Post</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={require("../../assets/icons/edit.png")}
                          style={{
                            height: 20,
                            width: 20,
                            marginVertical: 10,
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        />
                      </TouchableOpacity>
                      <Text>Edit Privacy</Text>
                    </View>
                  </ModalPoup>
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                      source={require("../../assets/icons/menu.png")}
                      style={{
                        height: 14,
                        width: 14,
                        marginBottom: 34,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {/* end modal */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: -34,
                  marginLeft: 64,
                }}
              >
                <Image source={icons.globe} style={{ height: 20, width: 20 }} />
                <Text style={{ marginLeft: 8 }}>
                  {formatDate(post.createAt)}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 30,
                  ...FONTS.h3,
                  color: COLORS.black,
                  marginBottom: 10,
                }}
              >
                {post.content}
              </Text>
              <ScrollView horizontal style={{ flexDirection: "row" }}>
                <FlatList
                  numColumns={10}
                  data={listImg}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item, index }) => {
                    if (post.id == item.postId) {
                      return (
                        <Image
                          style={{
                            width: 400,
                            height: 240,
                            marginRight: 20,
                            resizeMode: "cover",
                          }}
                          source={{ uri: item.imageUrl }}
                        ></Image>
                      );
                    }
                    return null;
                  }}
                />
              </ScrollView>
              {/* ======comment ==== */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 14,
                  justifyContent: "space-between",
                  marginLeft: 8,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={icons.thumpUp} style={style.iconf} />
                  <Image source={icons.heart} style={style.iconf} />
                  <Image source={icons.angry} style={style.iconf} />
                  <Image source={icons.sad} style={style.iconf} />
                  <Text>10+</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#65676b" }}>
                    {getCountComment(postId)} bình luận
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-around",
                  marginBottom: 10,
                  borderTopColor: "#ececec",
                  borderTopWidth: 1,
                  paddingTop: 10,
                }}
              >
                <TouchableOpacity style={style.btn}>
                  <Image source={icons.like} style={style.icon}></Image>
                  <Text style={style.text}>Thích </Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.btn}>
                  <Image source={icons.comment} style={style.icon}></Image>
                  <Text style={style.text}>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btn}>
                  <Image source={icons.share} style={style.icon}></Image>
                  <Text style={style.text}>Chia sẽ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* ======comment ==== */}
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#ececec",
            paddingTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 80,
          }}
        >
          <FlatList
            data={comment}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 40,
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={{ uri: getAvtAlumni(item.alumniId) }}
                    style={style.img}
                  />
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#f1eeee",
                      width: 350,
                      borderRadius: 20,
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: COLORS.black,
                      }}
                    >
                      {getNameAlumni(item.alumniId)}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontWeight: "300",
                        fontSize: 16,
                        marginTop: 10,
                      }}
                    >
                      {item.content}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 12,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* ====== text hour and like and reply */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={style.text2}>
                          {formatDateComment(item.createAt)}
                        </Text>
                        {alumniId == item.alumniId ? (
                          <View>
                            <TouchableOpacity
                              style={style.btnDeletCmt}
                              onPress={() =>
                                confirmDeleteComment(item.id, authorize)
                              }
                            >
                              <Text style={style.text3}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={style.btnEditCmt}
                              onPress={() =>
                                navigation.navigate("Sửa Bình Luận Bài Viết", {
                                  id: item.id,
                                })
                              }
                            >
                              <Text style={style.text4}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {/* ======Write Comment===== */}
      </ScrollView>
      <View
        style={{
          width: width,
          backgroundColor: "white",
          shadowOpacity: 0.1,
          padding: 10,
        }}
      >
        <TextInput
          placeholder={" Viết Bình Luận ..."}
          multiline
          value={content}
          style={{
            borderWidth: 0.1,
            backgroundColor: "#e7e6e6",
            height: 40,
            borderRadius: 10,
            marginHorizontal: 8,
            padding: 10,
          }}
          onChangeText={(content) => setContent(content)}
        />
        {/* =====icons image and button comment ====== */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: 120,
              justifyContent: "space-around",
              marginLeft: 10,
            }}
          >
            <Image source={icons.camera} style={style.icon_comment} />
            <Image source={icons.gif} style={style.icon_comment} />
            <Image source={icons.smile_face} style={style.icon_comment} />
            <Image source={icons.fmale} style={style.icon_comment} />
          </View>
          <TouchableOpacity onPress={() => validateComment()}>
            <Image
              source={icons.send}
              style={{ height: 20, width: 20, marginRight: 18 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  icon_comment: {
    height: 20,
    width: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
  msg: {
    ...FONTS.h3,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    marginRight: 65,
    color: COLORS.black,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // shadowOpacity: 0.2,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  plusBtn: {
    backgroundColor: "#088dcd",
    height: 45,
    width: 45,
    borderRadius: SIZES.largeTitle,
    position: "absolute",
    right: 10,
    top: 170,
  },
  textPlus: {
    position: "absolute",
    fontSize: 18,
    top: 14,
    left: 16,
    zIndex: 2,
    color: "white",
  },
  iconf: {
    height: 20,
    width: 20,
  },
  text2: {
    fontSize: 12,
    position: "absolute",
    bottom: -30,
    color: "gray",
  },
  text3: {
    fontSize: 14,
    color: "gray",
  },
  btnDeletCmt: {
    position: "absolute",
    bottom: -30,
    right: 30,
  },
  text4: {
    fontSize: 14,
    color: "gray",
  },
  btnEditCmt: {
    position: "absolute",
    bottom: -30,
    right: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default GroupPostDetail;
