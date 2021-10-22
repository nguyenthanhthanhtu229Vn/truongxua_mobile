import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, icons } from "../../constant";

const comment = [
  {
    rating: "12",
    img: require("../../assets/images/event.jpg"),
    user: "Bryan",
    content:
      "Last summer, as Portland, Oregon, began to sizzle under a brutal, triple-digit heat wave, Vivek Shandas installed a window air conditioner in the bedroom of his home.",
  },
  // {
  //   rating: "6",
  //   img: require("../../assets/images/event.jpg"),
  //   user: "Bryan",
  //   content:
  //     "Last summer, as Portland, Oregon, began to sizzle under a brutal, triple-digit heat wave, Vivek Shandas installed a window air conditioner in the bedroom of his home.",
  // },
  // {
  //   rating: "9",
  //   img: require("../../assets/images/event.jpg"),
  //   user: "Bryan",
  //   content:
  //     "Last summer, as Portland, Oregon, began to sizzle under a brutal, triple-digit heat wave, Vivek Shandas installed a window air conditioner in the bedroom of his home.",
  // },
  // {
  //   rating: "9",
  //   img: require("../../assets/images/event.jpg"),
  //   user: "Bryan",
  //   content:
  //     "Last summer, as Portland, Oregon, began to sizzle under a brutal, triple-digit heat wave, Vivek Shandas installed a window air conditioner in the bedroom of his home.",
  // },
];
const GroupPostDetail = () => {
  return (
    <View style={{ marginHorizontal: 12, marginTop: 10, position: 'relative',backgroundColor:'white' }}>
      <FlatList
        data={comment}
        renderItem={({ item, index }) => {
          return (
            <View>
              <View style={{ flexDirection: "row", marginBottom: 40 }}>
                <Image source={item.img} style={style.img} />
                <View
                  style={{
                    height: Dimensions.get("window").height / 8,
                    backgroundColor: "#f1eeee",
                    width: 320,
                    borderRadius: 8,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: COLORS.black,
                    }}
                  >
                    {item.user}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: "300",
                      fontSize: 16,
                    }}
                  >
                    {item.content}
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
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={style.text}>18h</Text>
                      <TouchableOpacity onPress={() => console.log("like")}>
                        <Text style={style.text}>Thích</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log("reply")}>
                        <Text style={style.text}>Trả Lời</Text>
                      </TouchableOpacity>
                    </View>

                    {/* =====Rating and Icons===== */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16, marginRight: 6 }}>
                        {item.rating}
                      </Text>
                      <Image source={icons.thumpUp} style={style.iconf} />
                      <Image source={icons.heart} style={style.iconf} />
                      <Image source={icons.angry} style={style.iconf} />
                      <Image source={icons.sad} style={style.iconf} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      {/* ======Write Comment===== */}
      <View
        style={{
          height: 80,
          width: 400 ,
          backgroundColor: "white",
          shadowOpacity: 0.1,
          marginHorizontal: -14,
          // marginTop: 60,
          position: 'absolute',
          top: 640,
          // zIndex:100
        }}
      >
        <TextInput
          placeholder={"Viết Bình Luận ....."}
          multiline
          style={{
            borderWidth: 0.1,
            backgroundColor: "#e7e6e6",
            paddingLeft: 8,
            paddingTop: 10,
            height: 40,
            borderRadius: 10,
            marginHorizontal: 8,
            marginTop: 6,
            marginRight: 10
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
            }}
          >
            <Image source={icons.camera} style={style.icon_comment} />
            <Image source={icons.gif} style={style.icon_comment} />
            <Image source={icons.smile_face} style={style.icon_comment} />
            <Image source={icons.fmale} style={style.icon_comment} />
          </View>
          <TouchableOpacity onPress={() => console.log('Post Comment')}>
            <Image
              source={icons.send}
              style={{ height: 20, width: 20, marginRight: 18 }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    height: 16,
    width: 16,
  },
  icon_comment: {
    height: 20,
    width: 20,
  },
  text: {
    fontSize: 16,
    color: "#8d8c8c",
    marginRight: 6,
    fontWeight: "400",
  },
});

export default GroupPostDetail;
