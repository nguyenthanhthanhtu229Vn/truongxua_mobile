import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, FONTS,SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import MyCarousel from "../carousel/MyCarousel";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Event: React.FC = (props) => {
  const [isLoading, setLoading] = useState(true);
  const eventURL = "http://20.188.111.70:12348/api/v1/Events";
  const [event, setData] = useState({});
  // console.log(event);
  useEffect(() => {
    fetch(eventURL)
      .then((response) =>
        response.json().then((res) => {
          setData(res);
        })
      )
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  });

  const navigation = useNavigation();
  const { banner } = props;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyCarousel />

        {/* Plust Btn */}
        <TouchableOpacity style={style.plusBtn} onPress= {() => {
          navigation.navigate('NewEvent')
        }} >
          <Foundation name="plus" style={style.textPlus}></Foundation>
        </TouchableOpacity>

        <View style={style.container}>
          <FlatList
            contentContainerStyle={{
              flexDirection: "column",
            }}
            data={event}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 20,
                    alignItems: "center",
                  }}
                  key={item.id}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("EventDetail");
                    }}
                  >
                    <Image
                      source={require("../../assets/images/party1.jpg")}
                      style={{
                        height: SIZES.height / 5,
                        borderRadius: 5,
                        width: SIZES.width / 3,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10, width: SIZES.width / 2 }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        color: COLORS.black,
                        marginLeft: 4,
                        ...FONTS.h3,
                        fontWeight: "600",
                        fontSize: 19,
                        width: SIZES.width / 2.3,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        color: COLORS.darkGray,
                        marginLeft: 4,
                        ...FONTS.h3,
                        fontWeight: "500",
                        fontSize: 16,
                        width: SIZES.width / 2.3,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      {item.description}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.darkGray,
                        marginLeft: 4,
                        ...FONTS.h4,
                        fontWeight: "500",
                      }}
                    >
                      {item.startDate}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "#17a2b8",
                          color: COLORS.white,
                          ...FONTS.h3,
                          fontWeight: "700",
                          width: 80,
                          textAlign: "center",
                          borderRadius: 7,
                        }}
                      >
                        Đặt
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
  plusBtn: {
    backgroundColor: "#088dcd",
    height: 45,
    width: 45,
    borderRadius: SIZES.largeTitle,
    position: "absolute",
    right: 10,
    top: 210,
  },
  textPlus: {
    position: "absolute",
    fontSize: 18,
    top: 14,
    left: 16,
    zIndex: 2,
    color: "white",
  },
});

export default Event;