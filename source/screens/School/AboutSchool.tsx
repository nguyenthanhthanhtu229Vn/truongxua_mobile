import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  AsyncStorage,
} from "react-native";
import { COLORS, icons } from "../../constant";
import { StyleSheet } from "react-native";
import ExploreEvent from "./ExplorEvent";
import Member from "./Member";
import PostAnalysis from "./PostAnalytics";
import axios from "axios";

const Information = ({
  header,
  text,
  msg,
  isHidden,
}: {
  header?: string;
  msg?: string;
  text?: string;
  isHidden?: boolean;
}) => {
  return (
    <View style={{ marginTop: 12 }}>
      {isHidden && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 22,
              width: 4,
              backgroundColor: "#088dcd",
              marginBottom: 6,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
              fontWeight: "600",
              color: COLORS.black,
              marginBottom: 8,
            }}
          >
            {header}
          </Text>
        </View>
      )}

      {/* =====Line====*/}
      {isHidden && <View style={style.line} />}

      {/* -=======infor add */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 18,
          marginVertical: 6,
        }}
      >
        <Image
          source={icons.dot}
          style={{ height: 8, width: 8, marginBottom: 20 }}
        />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{ color: COLORS.black, fontSize: 18, fontWeight: "400" }}
          >
            {text}
          </Text>
          <Text
            style={{
              color: "#b7b7b8",
              fontSize: 16,
              fontWeight: "400",
              marginTop: 4,
            }}
          >
            {msg}
          </Text>
        </View>
      </View>
      <View style={style.line} />
    </View>
  );
};

const Touchable = ({ icon, onPress }: { icon: any; onPress?: any }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 40,
        width: 40,
        backgroundColor: COLORS.white2,
        borderRadius: 20,
      }}
    >
      <Image
        source={icon}
        style={{ height: 20, width: 20, marginTop: 8, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};
const AboutSchool = () => {
  const [school, setSchool] = useState<boolean>(false);
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    //
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    await featchSchool(objUser.SchoolId);
  };
  const featchSchool = async (id) => {
    try {
      const reponse = await axios.get(
        "http://20.188.111.70:12348/api/v1/schools/" + id
      );
      if (reponse.status === 200) {
        setSchool(reponse.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    tokenForAuthor();
  }, []);
  return (
    <ScrollView>
      <View>
        {/* ======background image====== */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: school.image }}
            style={{
              height: 200,
              width: Dimensions.get("window").width,
              opacity: 0.7,
            }}
          />
        </View>
        {/* =======avatar=== */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            top: 40,
            left: "50%",
            transform: [{ translateX: "-100%" }],
          }}
        >
          {/* =====and name and address=== */}
          <View
            style={{
              marginLeft: 10,
              backgroundColor: "#088dcd",
              padding: 10,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 17,
                color: COLORS.white,
              }}
            >
              {school.name}
            </Text>
            <Text
              style={{ fontWeight: "500", fontSize: 16, color: COLORS.white }}
            >
              Quận Hải Châu,Đà Nẵng
            </Text>
          </View>
        </View>
        {/* ====Touchable====== */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            top: 120,
            left: "46%",
            transform: [{ translateX: "-100%" }],
            width: 250,
            justifyContent: "space-evenly",
          }}
        >
          {/* ====Touchable invite=== */}
          <Touchable icon={icons.invite_c} />
          {/* ====Touchable follow=== */}
          <Touchable icon={icons.star_c} />
          {/* ====Touchable share=== */}
          <Touchable icon={icons.share_c} />
          {/* ====Touchable invite colleagues=== */}
          {/* <TouchableOpacity
            style={{
              height: 30,
              width: 100,
              backgroundColor: COLORS.white2,
              borderRadius: 18,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: COLORS.blue,
                fontWeight: "500",
                textAlign: "center",
                marginTop: 4,
              }}
            >
              Mời Bạn
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* ====Information==== */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 30,
            padding: 20,
            backgroundColor: COLORS.white,
            borderWidth: 0.5,
            borderColor: "#E1E8EC",
            borderRadius: 6,
            flexDirection: "column",
          }}
        >
          <Information
            isHidden={true}
            header={"Thông Tin"}
            text={"Mô tả"}
            msg={school.description}
          />
          {/* <Information text={"Hiệu Trưởng"} msg={"Bryan Tran"} />
          <Information
            text={"Website"}
            msg={"http://www.huynhtanphat.edu.vn"}
          />
          <Information text={"Số Điện Thoại"} msg={"0977233394"} />
          <Information text={"Fax"} msg={"0977233391"} /> */}
        </View>
        {/* =====Explor exvent==== */}
        <ExploreEvent />
        {/* =========memeber======= */}
        <Member />
        {/* =====Phan tich bai dang */}
        <PostAnalysis />
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  line: {
    height: 1,
    width: 330,
    marginVertical: 2,
    backgroundColor: "#E1E8EC",
    marginHorizontal: 16,
  },
});
export default AboutSchool;
