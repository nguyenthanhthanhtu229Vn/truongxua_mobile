import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  FlatList,
  AsyncStorage,
  RefreshControl,
  Alert,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import { Entypo, Foundation, MaterialIcons } from "@expo/vector-icons";
import Member from "../School/Member";

const width = Dimensions.get("window").width;

// ========= Start Modal=========
const ModalPoup = ({ visible, children }: { visible: any; children: any }) => {
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
          style={[style.modalContainer, { transform: [{ scale: scaleValue }] }]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const TouchSocial = ({ icon }: { icon: any }) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 8,
      }}
    >
      <Image
        source={icon}
        style={{ width: 30, height: 30, alignSelf: "center", marginTop: 2 }}
      />
    </TouchableOpacity>
  );
};

const GroupDetail = () => {
  const isFocused = useIsFocused();
  const baseUrl = "https://truongxuaapp.online";
  const navigation = useNavigation();
  const route = useRoute();
  const [groupDetail, setGroupDetail] = useState<boolean>(false);
  const [authorize, setAuthorize] = useState();
  const [idUser, setIdUser] = useState<string>();
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setIdUser(objUser.Id);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    await featchGroupDetail(headers);
    await featchAlumni(headers);
    await featchPosts(headers);
    await featchImageEvent(headers);
    await featchComment(headers);
  };

  //Call API Group
  const groupURL = `https://truongxuaapp.online/api/v1/groups/`;
  async function featchGroupDetail(headers) {
    try {
      const response = await axios.get(groupURL + route.params.id, { headers });
      if (response.status === 200) {
        setGroupDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // =======Begin Call Api Post
  const [visible, setVisible] = useState(false);
  const [idPost, setIdPost] = useState();
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState();

  //==========Update id first open Modal Popup
  const [alumniOfPost, setAlumniOfPost] = useState();
  const updateValueForModalPopup = (id, alumni) => {
    setVisible(true);
    setIdPost(id);
    setAlumniOfPost(alumni);
  };

  const postURL =
    `https://truongxuaapp.online/api/v1/groups/` +
    route.params.id +
    `/posts?sort=desc`;
  async function featchPosts(headers) {
    try {
      const response = await axios.get(postURL, { headers });
      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  // Call Api Image for Post
  const [listImg, setListImg] = useState<string>("");
  const featchImageEvent = async (headers) => {
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
  useEffect(() => {
    tokenForAuthor();
  }, [isFocused]);

  //=====Call Api Comment=======
  const [comment, setComment] = useState<string>("");
  const commentURL =
    "https://truongxuaapp.online/api/v1/posts/comments?sort=desc&pageNumber=0&pageSize=0";
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

  const getCountComment = (postId) => {
    let count = 0;
    for (let i = 0; i < comment.length; i++) {
      if (comment[i].postId == postId) {
        count++;
      }
    }
    return count;
  };
  //========== Get Alumni create Post ===========
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

  //====== begin detele post =======
  const onSubmitFormHandler = async (id, headers) => {
    setLoading(true);
    Alert.alert("Xóa", "Bạn muốn xóa bài đăng này", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "Đồng ý", onPress: () => deleteComment(id, headers) },
    ]);
  };

  // Delete Image
  const getIdForImgDelete = (id) => {
    const idImgDelete = [];
    for (let i = 0; i < listImg.length; i++) {
      if (id == listImg[i].postId) {
        idImgDelete.push(listImg[i].id);
      }
    }
    return idImgDelete;
  };

  const deleteImgPost = async (id, headers) => {
    for (let i = 0; i < getIdForImgDelete(id).length; i++) {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/images/" + getIdForImgDelete(id)[i],
        { headers }
      );
    }
    await deletePost(id, headers);
  };

  // Delete Comment
  const getIdForCommentDelete = (id) => {
    const idCmtDelete = [];
    for (let i = 0; i < comment.length; i++) {
      if (id == comment[i].postId) {
        idCmtDelete.push(comment[i].id);
      }
    }
    return idCmtDelete;
  };
  const deleteComment = async (id, headers) => {
    for (let i = 0; i < getIdForCommentDelete(id).length; i++) {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/posts/comments/" +
          getIdForCommentDelete(id)[i],
        { headers }
      );
    }
    await deleteImgPost(id, headers);
  };

  const deletePost = async (id, headers) => {
    try {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/posts/" + id,
        { headers }
      );
      if (response.status === 200) {
        alert("Xoá Bài Viết Thành Công ");
        setVisible(false);
        await tokenForAuthor();
      }
    } catch (error) {
      console.log(error);
      alert("Bị Lỗi Không Xoá Được ");
      setLoading(false);
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

  return (
    <View>
      <ScrollView
        refreshControl={<RefreshControl onRefresh={() => tokenForAuthor()} />}
      >
        {/* =======HEADER====== */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: groupDetail.backgroundImg }}
            // source={require("../../assets/images/event.jpg")}
            style={{ width: width, height: 200 }}
          />
          {/*=======button add =====  */}
          <TouchableOpacity
            style={style.plusBtn}
            onPress={() => {
              navigation.navigate("Tạo Bài Đăng", {
                id: route.params.id,
                numberAlumni: route.params.numberAlumni,
              });
            }}
          >
            <Foundation name="plus" style={style.textPlus}></Foundation>
          </TouchableOpacity>
          {idUser == groupDetail.groupAdminId ? (
            <View style={style.updateBTn}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Sửa Hình Nền Nhóm", {
                    id: route.params.id,
                    numberAlumni: route.params.numberAlumni,
                  });
                }}
              >
                <Entypo name="camera" style={style.textUpdate}></Entypo>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: "row",
              width: 120,
              height: 24,
              paddingTop: 2,
              backgroundColor: "#F62B53",
              borderRadius: 4,
              position: "absolute",
              top: 10,
              right: -20,
              marginRight: 20,
            }}
          >
            <Image
              source={require("../../assets/icons/checkb.png")}
              style={{ height: 20, width: 20, marginLeft: 6 }}
            />
            <Text style={{ color: COLORS.white, fontWeight: "500" }}>
              Đã Tham Gia
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{ uri: groupDetail.avataImg }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: "absolute",
              top: -84,
              left: 20,
            }}
          />
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: "700",
              fontSize: 18,
              backgroundColor: "black",
              color: COLORS.white,
              position: "absolute",
              bottom: 30,
              left: 130,
            }}
          >
            {/* Nhóm 12A1 */}
            {groupDetail.name}
          </Text>
        </View>

        {/* =======Member ========= */}
        <View
          style={{
            padding: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Image source={icons.group2} style={style.icon} />
            <Text style={style.msg}>Thành Viên</Text>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 16,
                fontWeight: "300",
              }}
            >
              {route.params.numberAlumni}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              width: 240,
            }}
          >
            <MaterialIcons name="policy" style={{ fontSize: 18 }} />
            <Text style={style.msg}>Điều lệ</Text>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 16,
                fontWeight: "300",
              }}
            >
              {groupDetail.policy}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 25 }}>
            <Image source={icons.globe} style={style.icon} />
            <Text style={style.msg}>Mô tả</Text>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 16,
                fontWeight: "300",
                marginRight: 100,
                width: 240,
              }}
            >
              {groupDetail.description}
            </Text>
          </View>
        </View>

        {/* ======Begin Post ==== */}
        <Member />
        <View>
          <FlatList
            data={post}
            renderItem={({ item, index }) => {
              return (
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
                        source={{ uri: getAvtAlumni(item.alumniId) }}
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
                        {getNameAlumni(item.alumniId)}
                      </Text>
                      {/* ====begin modal====== */}
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/*  */}
                        <ModalPoup visible={visible}>
                          <View style={{ alignItems: "center" }}>
                            <View style={style.header}>
                              <TouchableOpacity
                                onPress={() => setVisible(false)}
                              >
                                <Image
                                  source={require("../../assets/icons/error.png")}
                                  style={{ height: 30, width: 30 }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          {groupDetail.groupAdminId != idUser ||
                          idUser == alumniOfPost ? (
                            <View>
                              <TouchableOpacity
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                                onPress={() =>
                                  navigation.navigate("Sửa Bài Đăng", {
                                    id: idPost,
                                    numberAlumni: route.params.numberAlumni,
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
                                <Text>Chỉnh Sửa Bài Đăng </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}

                          {/* delete */}
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() =>
                              onSubmitFormHandler(idPost, authorize)
                            }
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
                            <Text>Xoá Bài Đăng</Text>
                          </TouchableOpacity>
                        </ModalPoup>

                        {/*  */}
                        {item.alumniId == idUser ||
                        groupDetail.groupAdminId == idUser ? (
                          <TouchableOpacity
                            onPress={() =>
                              updateValueForModalPopup(item.id, item.alumniId)
                            }
                          >
                            <Image
                              source={require("../../assets/icons/menu.png")}
                              style={{
                                height: 14,
                                width: 14,
                                marginBottom: 34,
                              }}
                            />
                          </TouchableOpacity>
                        ) : null}
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
                      <Image
                        source={icons.globe}
                        style={{ height: 20, width: 20 }}
                      />
                      <Text style={{ marginLeft: 8 }}>
                        {formatDate(item.createAt)}
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
                      {item.content}
                    </Text>
                    {/* =======img for post==== */}
                    <ScrollView horizontal style={{ flexDirection: "row" }}>
                      <FlatList
                        numColumns={999}
                        data={listImg}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item2, index }) => {
                          if (item.id == listImg[index].postId) {
                            return (
                              <Image
                                style={{
                                  width: 400,
                                  height: 240,
                                  marginRight: 20,
                                  resizeMode: "cover",
                                }}
                                source={{ uri: listImg[index].imageUrl }}
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image source={icons.thumpUp} style={style.iconf} />
                        <Image source={icons.heart} style={style.iconf} />
                        <Image source={icons.angry} style={style.iconf} />
                        <Image source={icons.sad} style={style.iconf} />
                        <Text>10+</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ color: "#65676b" }}>
                          {getCountComment(item.id)} bình luận
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

                      <TouchableOpacity
                        style={style.btn}
                        onPress={() =>
                          navigation.navigate("Chi Tiết Bài Đăng", {
                            id: item.id,
                          })
                        }
                      >
                        <Image
                          source={icons.comment}
                          style={style.icon}
                        ></Image>
                        <Text style={style.text}>Bình luận</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.btn}>
                        <Image source={icons.share} style={style.icon}></Image>
                        <Text style={style.text}>Chia sẽ</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  img: {
    height: 16,
    width: 16,
    bottom: 4,
  },
  icon: {
    height: 20,
    width: 20,
  },
  msg: {
    ...FONTS.h3,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    color: COLORS.black,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconf: {
    height: 20,
    width: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
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
  textUpdate: {
    position: "absolute",
    fontSize: 18,
    top: 14,
    left: 13,
    zIndex: 2,
    color: "white",
  },
  updateBTn: {
    backgroundColor: "#088dcd",
    height: 45,
    width: 45,
    borderRadius: SIZES.largeTitle,
    position: "absolute",
    right: 80,
    top: 170,
  },
});
export default GroupDetail;
