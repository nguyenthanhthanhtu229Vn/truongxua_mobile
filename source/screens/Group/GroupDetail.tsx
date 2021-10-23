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
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import { Foundation } from "@expo/vector-icons";

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

const TouchSocial = ({ icon, bg }: { icon: any; bg: string }) => {
  return (
    <TouchableOpacity
      style={{
        height: 30,
        width: 60,
        borderRadius: 6,
        backgroundColor: bg,
        marginHorizontal: 6,
      }}
    >
      <Image
        source={icon}
        style={{ width: 24, height: 24, alignSelf: "center", marginTop: 2 }}
      />
    </TouchableOpacity>
  );
};

const GroupDetail = () => {
  const baseUrl = "http://20.188.111.70:12348";
  const groupURL = `${baseUrl}/api/v1/groups/`;
  const navigation = useNavigation();
  const route = useRoute();
  const [groupDetail, setGroupDetail] = useState<boolean>(false);
  // useEffect(() => {
  //   fetch(groupURL + route.params.id)
  //     .then((response) =>
  //       response.json().then((res) => {
  //         setGroupDetail(res);
  //       })
  //     )
  //     .catch((error) => alert(error));
  // });
  async function featchGroupDetail() {
    try {
      const response = await axios.get(groupURL + route.params.id);
      setGroupDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // =======Begin Call Api Post
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const postURL = `${baseUrl}/api/v1/posts?sort=desc&pageNumber=0&pageSize=5`;
  const [data, setData] = useState({});
  // useEffect(() => {
  //   fetch(postURL)
  //     .then((response) =>
  //       response.json().then((res) => {
  //         setData(res);
  //       })
  //     )
  //     .catch((error) => alert(error))
  //     .finally(() => setLoading(false));
  // });

  async function featchPosts() {
    try {
      const response = await axios.get(postURL);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    featchGroupDetail();
    featchPosts();
  }, []);
  //====== begin detele post =======
  const [content, setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [createAt, setCreateAt] = useState(new Date());
  const [modifiedAt, setModifiedAt] = useState(null);
  const [status, setStatus] = useState(true);
  const onSubmitFormHandler = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/posts/` + id);
      if (response.status === 200) {
        alert("Delete Post Success");
        setTimeout(function () {
          setVisible(false);
        }, 2);
        // setVisible(false)
      }
    } catch (error) {
      alert("Failed to delete resource");
      setLoading(false);
    }
  };

  // ======Format Date====
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      day.getDate() +
      " tháng " +
      (day.getMonth() + 1) +
      ", " +
      day.getFullYear() +
      " lúc " +
      day.getHours() +
      ":" +
      day.getMinutes()
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {/* =======HEADER====== */}
        <View style={{ position: "relative" }}>
          <Image
            // source={{ uri: groupDetail.backgroundImg }}
            source={require("../../assets/images/event.jpg")}
            style={{ width: width, height: 200 }}
          />
          {/*=======button add =====  */}
          <TouchableOpacity
            style={style.plusBtn}
            onPress={() => {
              navigation.navigate("Create Post In Group");
            }}
          >
            <Foundation name="plus" style={style.textPlus}></Foundation>
          </TouchableOpacity>

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
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 6,
              left: 130,
            }}
          >
            <Image
              source={require("../../assets/icons/star_y.png")}
              style={style.img}
            />
            <Image
              source={require("../../assets/icons/star_y.png")}
              style={style.img}
            />
            <Image
              source={require("../../assets/icons/star_y.png")}
              style={style.img}
            />
            <Image
              source={require("../../assets/icons/star_y.png")}
              style={style.img}
            />
            <Image
              source={require("../../assets/icons/star_y.png")}
              style={style.img}
            />
          </View>
        </View>

        {/* =======Member ========= */}
        <View
          style={{
            flexDirection: "column",
            marginVertical: 30,
            marginHorizontal: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={icons.group2} style={style.icon} />
            <Text style={style.msg}>Thành Viên</Text>
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.h4,
                fontWeight: "300",
              }}
            >
              {route.params.numberAlumni}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image source={icons.camera} style={style.icon} />
            <Text style={style.msg}>Danh Mục</Text>
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.h4,
                fontWeight: "300",
                marginRight: 20,
              }}
            >
              Giải Trí
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={icons.globe} style={style.icon} />
            <Text style={style.msg}>Nhóm</Text>
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.h4,
                fontWeight: "300",
                marginLeft: 32,
              }}
            >
              Công Khai
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image source={icons.group2} style={style.icon} />
            <Text style={style.msg}>Mời</Text>
            <Text
              style={{
                color: "#F62B53",
                ...FONTS.h4,
                fontWeight: "400",
                marginLeft: 52,
              }}
            >
              Gửi Lời Mời
            </Text>
          </View>
          {/* ====== Button Social ==== */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchSocial icon={icons.fb} bg={"#506EAB"} />
            <TouchSocial icon={icons.twitter} bg={"#08A5D4"} />
            <TouchSocial icon={icons.youtube} bg={"#E62017"} />
            <TouchSocial icon={icons.pinterest} bg={"#CB2129"} />
            <TouchSocial icon={icons.instagram} bg={"#444444"} />
          </View>
        </View>

        <View style={{ marginTop: -170 }}>
          {/* ======Begin News ==== */}
          <View style={{ marginTop: 150 }}>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      // height: 450,
                      height: 200,
                      backgroundColor: COLORS.white2,
                      shadowOpacity: 0.4,
                      marginBottom: 16,
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
                          source={require("../../assets/images/avatar.jpeg")}
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
                          }}
                        >
                          Quang Huy
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

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("EditPost", {
                                    id: item.id,
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
                                onPress={() => onSubmitFormHandler(item.id)}
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
                                marginLeft: 170,
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
                          marginTop: 20,
                          ...FONTS.h3,
                          color: COLORS.black,
                          marginBottom: 10,
                        }}
                      >
                        {item.content}
                      </Text>
                      {/* ======comment ==== */}
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 14,
                          alignItems: "center",
                          marginLeft: 8,
                        }}
                      >
                        <Image source={icons.thumpUp} style={style.iconf} />
                        <Image source={icons.heart} style={style.iconf} />
                        <Image source={icons.angry} style={style.iconf} />
                        <Image source={icons.sad} style={style.iconf} />
                        <Text>10+</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 10,
                          justifyContent: "space-around",
                        }}
                      >
                        <TouchableOpacity style={style.btn}>
                          <Image source={icons.like} style={style.icon}></Image>
                          <Text style={style.text}>Like </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={style.btn}
                          onPress={() => navigation.navigate("GroupPostDetail")}
                        >
                          <Image
                            source={icons.comment}
                            style={style.icon}
                          ></Image>
                          <Text style={style.text}>Comment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn}>
                          <Image
                            source={icons.share}
                            style={style.icon}
                          ></Image>
                          <Text style={style.text}>Share</Text>
                        </TouchableOpacity>
                      </View>

                      <Image
                        source={item.images}
                        style={{ width: "100%" }}
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  img: {
    height: 16,
    width: 16,
    bottom: 4,
  },
  icon: {
    height: 22,
    width: 22,
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
    width: 100,
    height: 30,
    backgroundColor: "#eeecec",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    shadowOpacity: 0.2,
  },
  iconf: {
    height: 20,
    width: 20,
  },
  text: {
    ...FONTS.h4,
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
});
export default GroupDetail;
