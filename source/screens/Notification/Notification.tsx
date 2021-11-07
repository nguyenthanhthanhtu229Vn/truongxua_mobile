/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  RefreshControl,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import firebase from "firebase";
const Notification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const db = firebase.firestore();
  const [noti, setNoti] = useState([]);
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
  useLayoutEffect(() => {
    const readUser = async () => {
      const infoUser = await AsyncStorage.getItem("infoUser");
      const objUser = JSON.parse(infoUser);
      const unsubcribe = db
        .collection("notifications")
        .doc(objUser.Id + "")
        .collection("messages")
        .orderBy("createAt", "desc")
        .onSnapshot((snapshot) =>
          setNoti(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              createAt: doc.data().createAt.toDate(),
            }))
          )
        );
      return unsubcribe;
    };
    readUser();
  }, [visible]);
  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={() => setVisible(!visible)} />}
    >
      <View>
        <View
          style={{
            backgroundColor: "#088dcd",
            height: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white2,
              fontWeight: "700",
              marginLeft: 10,
            }}
          >
            Thông Báo
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              fontWeight: "400",
              marginRight: 10,
            }}
          >
            Trang Chủ/Thông Báo
          </Text>
        </View>
        <View style={style.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={noti}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 20,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: SIZES.largeTitle,
                    }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        marginLeft: 4,
                        ...FONTS.h3,
                        fontWeight: "500",
                        fontSize: 17,
                        width: 300,
                      }}
                    >
                      {item.content}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.darkGray,
                        marginLeft: 4,
                        ...FONTS.h4,
                        fontWeight: "500",
                        marginTop: 5,
                      }}
                    >
                      {formatDate(item.createAt)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});
export default Notification;
