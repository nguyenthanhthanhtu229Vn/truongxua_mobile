import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
const GROUPS = [
  {
    img: require("../../assets/images/event.jpg"),
    name: "12A1",
    "number-people": "1.2k",
  },
  {
    img: require("../../assets/images/event2.jpg"),
    name: "12A2",
    "number-people": "1.2k",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "12A1",
    "number-people": "1.2k",
  },
  {
    img: require("../../assets/images/event2.jpg"),
    name: "12A2",
    "number-people": "1.2k",
  },
];
const JOINED_GROUP = [
  {
    img: require("../../assets/images/event.jpg"),
    name: "Quang huy",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "Quang huy",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "Quang huy",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "Quang huy",
  },
];
const SUGGESTED = [
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
  {
    img: require("../../assets/images/event.jpg"),
    name: "11A1",
  },
];
const Group = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#F62B53",
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
            Groups
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              fontWeight: "400",
              marginRight: 10,
            }}
          >
            Home/Groups
          </Text>
        </View>
        {/* ========HEADER========= */}
        <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
          <View style={style.line} />
          <Text style={style.header}>My Groups</Text>
        </View>
        {/*=====FlatList Group=========  */}
        <View>
          <FlatList
            data={GROUPS}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginLeft: 10, marginBottom: 20 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("GroupDetails")}
                  >
                    <Image
                      source={item.img}
                      style={{
                        height: 120,
                        width: 180,
                        borderRadius: SIZES.radius,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 8,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h3,
                        fontSize: 20,
                        color: COLORS.black,
                        fontWeight: "500",
                        marginLeft: 8,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Image
                      source={icons.user2}
                      style={{
                        height: 16,
                        width: 16,
                        position: "relative",
                        left: 42,
                      }}
                    />
                    <Text style={{ ...FONTS.h4, fontSize: 18 }}>
                      {item["number-people"]}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          {/* ========HEADER========= */}
          <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
            <View style={style.line} />
            <Text style={style.header}>Joined Groups</Text>
            <FlatList
              data={JOINED_GROUP}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={item.img}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ ...FONTS.h4, fontSize: 18 }}>
                          {item.name}
                        </Text>
                        <Image
                          source={require("../../assets/icons/check.png")}
                          style={{ width: 14, height: 14, marginTop: 6 }}
                        />
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: "#F62B53",
                            position: "relative",
                            left: 14,
                            bottom: 18,
                          }}
                        >
                          Joined
                        </Text>
                      </View>
                    </View>
                    <View style={style.linegroup} />
                  </View>
                );
              }}
            />
          </View>
          {/* =========SUggested Group======== */}
          <View style={{ marginHorizontal: 16 }}>
            <View style={style.line} />
            <Text style={style.header}>Suggested Groups </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              data={SUGGESTED}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={{ marginLeft: 20 }}
                      onPress={() => navigation.navigate("GroupDetails")}
                    >
                      <Image
                        source={item.img}
                        style={{ height: 60, width: 60, borderRadius: 30 }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        marginLeft: 26,
                        marginTop: 6,
                        fontSize: 18,
                      }}
                    >
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: 20,
                        height: 30,
                        width: 62,
                        backgroundColor: "#F62B53",
                        borderRadius: 12,
                        marginTop: 4,
                      }}
                      onPress={() => navigation.navigate("GroupDetails")}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontWeight: "500",
                          fontSize: 18,
                          textAlign: "center",
                          paddingTop: 3,
                        }}
                      >
                        Join
                      </Text>
                    </TouchableOpacity>
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
  header: {
    ...FONTS.h3,
    color: COLORS.black,
    fontWeight: "500",
    fontSize: 20,
    position: "relative",
    bottom: 24,
    left: 8,
  },
  line: {
    height: 22,
    width: 4,
    backgroundColor: "#F62B53",
  },
  linegroup: {
    height: 1,
    width: 350,
    backgroundColor: COLORS.gray,
    marginVertical: 12,
    opacity: 0.2,
  },
});
export default Group;
