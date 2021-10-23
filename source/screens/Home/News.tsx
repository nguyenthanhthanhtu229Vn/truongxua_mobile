/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { idText } from "typescript";

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
// ======== End Modal=========
const News: React.FC = () => {
  const baseUrl = "http://20.188.111.70:12348";
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const postURL = `${baseUrl}/api/v1/news?sort=desc&pageNumber=0&pageSize=5`;
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(postURL)
      .then((response) =>
        response.json().then((res) => {
          setData(res);
        })
      )
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  });
  // delete post
  const [content, setContent] = useState("");
  const [alumniId, setAlumniId] = useState(1);
  const [createAt, setCreateAt] = useState(new Date());
  const [modifiedAt, setModifiedAt] = useState(null);
  const [status, setStatus] = useState(true);
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
  // ====== begin detele post =======
  const onSubmitFormHandler = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/news/` + id);

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
  //====== End detele post =======
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 150 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                // height: 450,
                height: 200,
                backgroundColor: COLORS.white2,
                shadowOpacity: 0.2,
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
                  {/* begin modal */}
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
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Edit Post")}
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
                        style={{ flexDirection: "row", alignItems: "center" }}
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
                        style={{ flexDirection: "row", alignItems: "center" }}
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
  );
};

const style = StyleSheet.create({
  btn: {
    width: 100,
    height: 30,
    backgroundColor: "#eeecec",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    shadowOpacity: 0.2,
  },
  icon: {
    height: 14,
    width: 14,
    marginLeft: 8,
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
});
export default News;
