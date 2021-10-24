import React from "react";
import { FlatList, View, Text, Image } from "react-native";
import { COLORS } from "../../constant";

const Event = [
  {
    icon: require("../../assets/icons/heart.png"),
    msg: "Chao Mung ngay nha giao viet nam 20/11",
  },
  {
    icon: require("../../assets/icons/heart.png"),
    msg: "Tham Gia Cuoc Thi Tieng Anh",
  },
];
const ExploreEvent = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 30,
        padding: 20,
        // height: 400,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: "#E1E8EC",
        borderRadius: 6,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
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
          Explor Event
        </Text>
      </View>
      {/* ======su kien */}
      <View>
        <FlatList
          data={Event}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  backgroundColor: COLORS.blue,
                  height: 100,
                  width: 330,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <Image
                  source={item.icon}
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: 140,
                    marginTop: 8,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  {item.msg}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ExploreEvent;
