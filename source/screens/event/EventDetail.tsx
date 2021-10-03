/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  EvilIcons,
} from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const SignUp: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <Image
            source={require("../../assets/images/eventSchool.jpg")}
            style={{ width: width, height: 250, marginTop: 30 }}
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
                fontFamily: "Roboto",
                fontSize: 18,
                color: "white",
              }}
            >
              2
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontFamily: "Roboto",
                fontSize: 22,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Th10
            </Text>
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 18,
                color: "white",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              2021
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
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "bold",
              }}
            ></AntDesign>
            <Text
              style={{
                color: "#088dcd",
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Từ: 11:SA đến 02:CH
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
                fontFamily: "Roboto",
                fontSize: 20,
              }}
            ></EvilIcons>
            <Text
              style={{
                color: "#6d757a",
                fontFamily: "Roboto",
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
              fontFamily: "Roboto",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Về thăm trường cũ khóa 2015-2018
          </Text>
          <Text
            style={{
              color: "#6d757a",
              fontFamily: "Roboto",
              fontSize: 16,
              marginTop: 20,
              lineHeight: 25,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
            consequatur, reprehenderit omnis velit modi obcaecati ad corporis
            sit possimus quos, praesentium sunt beatae dolorum, architecto
            facere esse ipsa tenetur nemo.
          </Text>
          <View>
            <Text
              style={{
                borderLeftColor: "#088dcd",
                borderLeftWidth: 3,
                paddingLeft: 10,
                color: "black",
                fontFamily: "Roboto",
                fontSize: 18,
                marginTop: 20,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Hình ảnh liên quan
            </Text>
            <ScrollView horizontal style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 200, height: 150, marginRight: 20 }}
                source={require("../../assets/images/eventSchool.jpg")}
              ></Image>
              <Image
                style={{ width: 200, height: 150, marginRight: 20 }}
                source={require("../../assets/images/eventSchool.jpg")}
              ></Image>
              <Image
                style={{ width: 200, height: 150, marginRight: 20 }}
                source={require("../../assets/images/eventSchool.jpg")}
              ></Image>
            </ScrollView>
            <Text
              style={{
                color: "#6d757a",
                fontFamily: "Roboto",
                fontSize: 16,
                marginTop: 20,
                lineHeight: 25,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
              consequatur, reprehenderit omnis velit modi obcaecati ad corporis
              sit possimus quos, praesentium sunt beatae dolorum, architecto
              facere esse ipsa tenetur nemo.
            </Text>
            <Text
              style={{
                color: "black",
                fontFamily: "Roboto",
                fontSize: 18,
                marginTop: 20,
              }}
            >
              Đã có 50 người đăng ký để tham gia sự kiện này
            </Text>
            <TouchableOpacity>
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
                    fontFamily: "Roboto",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Tham gia
                </Text>
                <AntDesign
                  name="arrowright"
                  style={{
                    fontFamily: "Roboto",
                    fontSize: 18,
                    color: "white",
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                ></AntDesign>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
