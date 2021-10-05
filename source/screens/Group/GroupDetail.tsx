import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import News from "../Home/News";

const width = Dimensions.get("window").width;
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
  return (
    <View>
      {/* =======HEADER====== */}
      <View style={{ position: "relative" }}>
        <Image
          source={require("../../assets/images/party2.jpg")}
          style={{ width: width }}
        />
      </View>
      <View>
        <Image
          source={require("../../assets/images/avatar.jpeg")}
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
            fontSize: 24,
            color: COLORS.white,
            position: "absolute",
            bottom: 30,
            left: 130,
          }}
        >
          Music Group
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
        <View
          style={{
            flexDirection: "row",
            marginLeft: 14,
            width: 80,
            height: 24,
            paddingTop: 2,
            backgroundColor: "#F62B53",
            borderRadius: 4,
            position: "absolute",
            bottom: 200,
            right: 0,
            marginRight: 20,
          }}
        >
          <Image
            source={require("../../assets/icons/checkb.png")}
            style={{ height: 20, width: 20, marginLeft: 6 }}
          />
          <Text style={{ color: COLORS.white, fontWeight: "500" }}>Joined</Text>
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
          <Text style={style.msg}>MEMBER</Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h4,
              fontWeight: "300",
              marginLeft: 18,
            }}
          >
            45
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
          <Text style={style.msg}>CATEGORY</Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h4,
              fontWeight: "300",
              marginRight: 20,
            }}
          >
            Entertainment
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.globe} style={style.icon} />
          <Text style={style.msg}>GROUP</Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h4,
              fontWeight: "300",
              marginLeft: 32,
            }}
          >
            Public
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
          <Text style={style.msg}>INVITE</Text>
          <Text
            style={{
              color: "#F62B53",
              ...FONTS.h4,
              fontWeight: "400",
              marginLeft: 38,
            }}
          >
            Send invitation
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
      <View style={{marginTop: -170}}>
      <News />
      </View>
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
});
export default GroupDetail;
