/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import { COLORS, icons } from "../../constant";
import { Alert } from "react-native";

var width = Dimensions.get("window").width; //full width
const EventDetail: React.FC = () => {
  const navigation = useNavigation();
  const [alumniId, setAlumniId] = useState<string>("");

  const route = useRoute();
  const [eventDetail, setEventDetail] = useState<string>("");
  const [listImg, setListImg] = useState<string>();
  const [authorize, setAuthorize] = useState();
 
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setAlumniId(objUser.Id);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    await listEventDetail(headers);
    await featchImageEvent(headers);
    await featchActivity(headers);
    await fetchCommentEvent(headers);
    await fetchAlumni(headers);
  };

  // Call API event detail
  const listEventDetail = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/events/" + route.params.id,
        { headers }
      );
      if (response.status === 200) {
        setEventDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call API for Image
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

  // Call API Activity
  const [listActivity, setListActivity] = useState();
  const featchActivity = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/activities?pageNumber=0&pageSize=0",
        { headers }
      );
      if (response.status === 200) {
        setListActivity(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  const getImageByEvent = (eventID) => {
    let imgLink = "";
    for (let i = 0; i < listImg?.length; i++) {
      if (listImg[i].eventId == eventID) {
        imgLink = listImg[i].imageUrl;
        break;
      }
    }
    return imgLink;
  };

  //comment
  const validateComment = (headers) => {
    if (content.trim() == "") {
      alert("Không được nhập trống");
    } else {
      createComment(headers);
    }
  };

  // Call Api Alumni
  const [alumni, setAlumni] = useState<string>("");
  const alumniURL =
    "https://truongxuaapp.online/api/v1/alumni?pageNumber=0&pageSize=0";
  const fetchAlumni = async (headers) => {
    try {
      const response = await axios.get(alumniURL, { headers });
      if (response.status === 200) {
        setAlumni(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  //Get Avatar and name
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
  // ======call api delete comment
  const confirmDeleteComment = async (id, headers) => {
    Alert.alert("Xoá", "Bạn muốn xoá bình luận này không?", [
      {
        text: "Huỷ",
        style: "cancel",
      },
      {
        text: "Đồng Ý",
        onPress: () => deleteCommentEvent(id, headers),
      },
    ]);
  };

  const deleteCommentEvent = async (id, headers) => {
    try {
      const response = await axios.delete(
        "https://truongxuaapp.online/api/v1/feedbacks/" + id,
        { headers }
      );
      if (response.status === 200) {
        await fetchCommentEvent(authorize);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // fetch comment
  const [commentEvent, setCommentEvent] = useState<string>("");
  const commentEventURL =
    "https://truongxuaapp.online/api/v1/feedbacks?sort=desc&pageNumber=0&pageSize=5";
  const fetchCommentEvent = async (headers) => {
    try {
      const response = await axios.get(commentEventURL, { headers });
      if (response.status === 200) {
        setCommentEvent(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

   // comment
   const [content, setContent] = useState<string>("");
   const [rateStart,setRateStart] = useState("");
   const [eventId, setEventId] = useState();

    // console.log(rateStart);
  const createComment = async (headers) => {
    try {
      const response = await axios.post("https://truongxuaapp.online/api/v1/feedbacks",{
        eventId,
        rateStart,
        content,
        alumniId,   
      },{headers});
      if (response.status === 200) {
        await fetchCommentEvent(authorize);
        setContent("");
        // setRating("");
        setRateStart("0");
      }
    } catch (error) {
      // alert("Ghi bình luận không thành công");
      // console.log(error)
      alert(error);
    }
  }

  // ======Format Date====
  const formatDay = (date) => {
    const day = new Date(date);
    return String(day.getDate()).padStart(2, "0");
  };
  const formatMonth = (date) => {
    const day = new Date(date);
    return String(day.getMonth() + 1).padStart(2, "0");
  };
  const formatYear = (date) => {
    const day = new Date(date);
    return day.getFullYear();
  };
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      "h" +
      String(day.getMinutes()).padStart(2, "0") +
      ", " +
      String(day.getDate()).padStart(2, "0") +
      "." +
      String(day.getMonth() + 1).padStart(2, "0") +
      "." +
      day.getFullYear()
    );
  };
  useEffect(() => {
    setEventId(route.params.id)
    tokenForAuthor();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: getImageByEvent(eventDetail.id) }}
            style={{
              width: width,
              height: 250,
              marginTop: 30,
              resizeMode: "cover",
            }}
          ></Image>
          <View
            style={{
              backgroundColor: "#088dcd",
              padding: 10,
              width: 100,
              alignItems: "center",
              position: "absolute",
              bottom: -50,
              right: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
              }}
            >
              {formatDay(eventDetail.startDate)}
            </Text>
            <Text
              style={{
                marginTop: 5,

                fontSize: 22,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Th{formatMonth(eventDetail.startDate)}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              {formatYear(eventDetail.startDate)}
            </Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircleo"
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
              }}
            ></AntDesign>
            <Text
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Diễn ra: {formatDate(eventDetail.startDate)}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircleo"
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
              }}
            ></AntDesign>
            <Text
              style={{
                color: "#088dcd",

                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Kết thúc: <Text>{formatDate(eventDetail.endDate)}</Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EvilIcons
              name="location"
              style={{
                color: "#6d757a",

                fontSize: 20,
              }}
            ></EvilIcons>
            <Text
              style={{
                color: "#6d757a",

                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Trường THPT Gia Định
            </Text>
          </View>
          <Text
            style={{
              color: "black",
              fontWeight: "500",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Sự kiện: {eventDetail.name}
          </Text>
          <Text
            style={{
              color: "#6d757a",

              fontSize: 16,
              marginTop: 20,
              lineHeight: 25,
            }}
          >
            {eventDetail.description}
          </Text>
          <View>
            <Text
              style={{
                borderLeftColor: "#088dcd",
                borderLeftWidth: 3,
                color: "black",

                fontSize: 18,
                marginTop: 20,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Hình ảnh liên quan
            </Text>
            <ScrollView horizontal style={{ flexDirection: "row" }}>
              <FlatList
                numColumns={10}
                data={listImg}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => {
                  if (eventDetail.id == item.eventId) {
                    return (
                      <Image
                        style={{
                          width: 200,
                          height: 200,
                          marginRight: 20,
                          resizeMode: "cover",
                        }}
                        source={{ uri: item.imageUrl }}
                      ></Image>
                    );
                  }
                }}
              />
            </ScrollView>
            <Text
              style={{
                borderLeftColor: "#088dcd",
                borderLeftWidth: 3,
                color: "black",
                fontSize: 18,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Những hoạt động về sự kiện
            </Text>
            <FlatList
              data={listActivity}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, index }) => {
                if (item.eventId == route.params.id) {
                  return (
                    <View>
                      <Text
                        style={{
                          color: "#6d757a",

                          fontSize: 16,
                          marginTop: 10,
                          lineHeight: 25,
                        }}
                      >
                        + {item.name}
                      </Text>
                    </View>
                  );
                }
                return null;
              }}
            />
            <Text
              style={{
                color: "black",

                fontSize: 18,
                marginTop: 20,
              }}
            >
              Đã có 50 người đăng ký để tham gia sự kiện này
            </Text>
            {/* =====end feedback event */}
            <TouchableOpacity onPress={() => navigation.navigate("Thanh Toán")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: "#088dcd",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Tham gia
                </Text>
                <AntDesign
                  name="arrowright"
                  style={{
                    fontSize: 18,
                    color: "white",
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                ></AntDesign>
              </View>
            </TouchableOpacity>
            {/* =====feedback event======= */}
            <ScrollView>
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
                data={commentEvent}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => {
                  if (item.eventId == route.params.id) {
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
                        <Text
                          style={{
                            color: COLORS.black,
                            fontWeight: "300",
                            fontSize: 16,
                            marginTop: 8,
                          }}
                        >
                          Rating Start: {item.rateStart}
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
                            {alumniId == item.alumniId ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  position: "relative",
                                  top: 40,
                                  left: 170,
                                }}
                              >
                                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Sửa Bình Luận",{
                                  id:item.id,
                                  eventId: item.eventId
                                })}>
                                  <Text style={style.text4}>Chỉnh sửa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    confirmDeleteComment(item.id, authorize)
                                  }
                                >
                                  <Text style={style.text3}>Xóa</Text>
                                </TouchableOpacity>
                              </View>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                  }
                  return null;
                }}
              />
            </View>
            </ScrollView>
            <View
              style={{
                height: 160,
                width: width,
                backgroundColor: "white",
                shadowOpacity: 0.1,
                position: "absolute",
                bottom: 0,
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
              <TextInput placeholder={'Danh Gia'}
               onChangeText ={(rating) => setRateStart(rating)}
              value={rateStart}
              // keyboardType="numeric" 
              style={{
                borderWidth: 0.1,
                backgroundColor: "#e7e6e6",
                height: 40,
                borderRadius: 10,
                marginHorizontal: 8,
                padding: 10,
                marginTop: 10
              }}
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
                    marginTop: 30
                  }}
                >
                  <Image source={icons.camera} style={style.icon_comment} />
                  <Image source={icons.gif} style={style.icon_comment} />
                  <Image source={icons.smile_face} style={style.icon_comment} />
                  <Image source={icons.fmale} style={style.icon_comment} />
                </View>
                <TouchableOpacity onPress={() => validateComment(authorize)}>
                  <Image
                    source={icons.send}
                    style={{ height: 20, width: 20, marginRight: 18 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  iconf: {
    height: 20,
    width: 20,
  },
  icon_comment: {
    height: 20,
    width: 20,
  },
  btnDeletCmt: {
    position: "absolute",
    bottom: -40,
    right: 60,
  },
  text4: {
    fontSize: 14,
    color: "gray",
  },
  btnEditCmt: {
    position: "absolute",
    bottom: -40,
    right: 100,
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
});
export default EventDetail;
