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
  const postURL = `${baseUrl}/api/v1/news?sort=desc&pageNumber=0&pageSize=0`;
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
  }, []);

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
  // ====== begin detele post =======
  const onSubmitFormHandler = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/news/` + id);

      if (response.status === 200) {
        alert("Xoá Bài Viết Thành Công ");
      }
    } catch (error) {
      alert("Bị Lỗi Không Xoá Được ");
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
                    source={icons.calendar}
                    style={{ height: 16, width: 16 }}
                  />
                  <Text style={{ marginLeft: 8 }}>
                    {formatDate(item.createAt)}
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

                      {/* =====Update Bai Viet===== */}
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() =>
                          navigation.navigate("Sửa Bài Viết", { item: item })
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
                        <Text>Chỉnh Sửa Bài Viết </Text>
                      </TouchableOpacity>

                      {/*=====delete ===== */}
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
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
                        <Text>Xoá Bài Viết</Text>
                      </TouchableOpacity>
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
                    marginTop: -20,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.nTitle}
                    style={{ height: 14, width: 14 }}
                  />
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.black,
                      fontWeight: "500",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>

                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                  }}
                >
                  {item.content}
                </Text>
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
