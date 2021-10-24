import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS, icons } from "../../constant";
import { StyleSheet } from "react-native";
import ExploreEvent from "./ExplorEvent";
import Member from "./Member";
import PostAnalysis from "./PostAnalytics";

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
  return (
    <ScrollView>
      <View>
        {/* ======background image====== */}
        <View style={{ position: "relative" }}>
          <Image
            source={require("../../assets/images/schools.jpg")}
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
            top: 50,
            left: 10,
          }}
        >
          <Image
            source={require("../../assets/images/event.jpg")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          {/* =====and name and address=== */}
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{ fontWeight: "600", fontSize: 17, color: COLORS.white }}
            >
              Trường THPT FPT
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
            left: 13,
            width: 250,
            justifyContent: "space-between",
          }}
        >
          {/* ====Touchable invite=== */}
          <Touchable icon={icons.invite_c} />
          {/* ====Touchable follow=== */}
          <Touchable icon={icons.star_c} />
          {/* ====Touchable share=== */}
          <Touchable icon={icons.share_c} />
          {/* ====Touchable invite colleagues=== */}
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        {/* ====Information==== */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 30,
            width: 370,
            height: 400,
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
            text={"Địa Chỉ"}
            msg={"51 Ly Phuc Man ,Phuong Binh Thuan Quan 7"}
          />
          <Information text={"Hiệu Trưởng"} msg={"Bryan Tran"} />
          <Information
            text={"Website"}
            msg={"http://www.huynhtanphat.edu.vn"}
          />
          <Information text={"Số Điện Thoại"} msg={"0977233394"} />
          <Information text={"Fax"} msg={"0977233391"} />
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
