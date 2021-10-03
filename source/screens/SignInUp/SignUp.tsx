/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const SignUp: React.FC = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../../assets/images/imgSignIn/bgSignIn.jpg")}
        style={{
          position: "relative",
          padding: 20,
          flex: 2,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "black",
            opacity: 0.5,
            width: width,
            bottom: 0,
          }}
        ></View>
        <Image
          source={require("../../assets/images/imgSignIn/logoSchool.png")}
          style={{ width: 80, height: 50, alignSelf: "center" }}
        ></Image>
        <Text style={{ color: "white", fontFamily: "Roboto", fontSize: 20 }}>
          Vui lòng đăng ký tài khoản
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
        >
          <AntDesign
            name="lock"
            style={{
              color: "white",
              marginRight: 5,
              fontFamily: "Roboto",
              fontSize: 23,
              fontWeight: "bold",
            }}
          ></AntDesign>
          <Text
            style={{
              color: "white",
              fontFamily: "Roboto",
              fontSize: 23,
              fontWeight: "bold",
            }}
          >
            Đăng ký
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ position: "relative" }}>
            <AntDesign
              name="user"
              style={{
                color: "#8e8e96",
                position: "absolute",
                right: 0,
                fontSize: 18,
              }}
            />
            <TextInput
              placeholder="Tên đăng nhập"
              placeholderTextColor="#8e8e96"
              style={{
                color: "white",
                borderBottomColor: "#8e8e96",
                borderBottomWidth: 1,
                fontFamily: "Roboto",
                fontSize: 18,
                paddingBottom: 5,
              }}
            />
          </View>
          <View style={{ position: "relative", marginTop: 15 }}>
            <AntDesign
              name="lock"
              style={{
                color: "#8e8e96",
                position: "absolute",
                right: 0,
                fontSize: 18,
              }}
            />
            <TextInput
              placeholder="Mật khẩu"
              secureTextEntry
              placeholderTextColor="#8e8e96"
              style={{
                color: "white",
                borderBottomColor: "#8e8e96",
                borderBottomWidth: 1,
                fontFamily: "Roboto",
                fontSize: 18,
                paddingBottom: 5,
              }}
            />
          </View>
          <View style={{ position: "relative", marginTop: 15 }}>
            <AntDesign
              name="lock"
              style={{
                color: "#8e8e96",
                position: "absolute",
                right: 0,
                fontSize: 18,
              }}
            />
            <TextInput
              placeholder="Xác nhận lại mật khẩu"
              secureTextEntry
              placeholderTextColor="#8e8e96"
              style={{
                color: "white",
                borderBottomColor: "#8e8e96",
                borderBottomWidth: 1,
                fontFamily: "Roboto",
                fontSize: 18,
                paddingBottom: 5,
              }}
            />
          </View>
        </View>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              borderRadius: 25,
              marginTop: 20,
              padding: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: 18,
              }}
            >
              Đăng ký
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              color: "#8e8e96",
              fontFamily: "Roboto",
              fontSize: 16,
              textAlign: "center",
              marginTop: 30,
              textDecorationLine: "underline",
            }}
          >
            Đã có tài khoản?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            left: "35%",
            transform: [{ translateX: -50 }],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <View
              style={{
                backgroundColor: "#088dcd",
                padding: 10,
                flexDirection: "row",
                marginRight: 30,
                borderRadius: 250,
              }}
            >
              <Feather
                name="key"
                style={{
                  color: "white",
                  marginRight: 5,
                  marginTop: 2,
                  fontSize: 16,
                }}
              ></Feather>
              <Text
                style={{ color: "white", fontFamily: "Roboto", fontSize: 16 }}
              >
                Đăng nhập
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <View
              style={{
                // backgroundColor: "#088dcd",
                backgroundColor: "white",
                padding: 10,
                flexDirection: "row",
                width: 115,
                justifyContent: "center",
                borderRadius: 250,
              }}
            >
              <SimpleLineIcons
                name="pencil"
                style={{
                  //   color: "white",
                  color: "#000",
                  marginRight: 5,
                  marginTop: 2,
                  fontSize: 16,
                }}
              ></SimpleLineIcons>
              <Text
                style={{ color: "black", fontFamily: "Roboto", fontSize: 16 }}
              >
                Đăng ký
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 20,
            marginTop: 20,
            color: "#595050",
          }}
        >
          Hoặc
        </Text>
        <Text style={{ fontFamily: "Roboto", fontSize: 18, color: "#595050" }}>
          Đăng nhập bằng
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/iconsSignIn/facebook.png")}
              style={{ width: 40, height: 40, marginRight: 20 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/iconsSignIn/google.png")}
              style={{ width: 40, height: 40, marginRight: 20 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/iconsSignIn/twitter.png")}
              style={{ width: 40, height: 40 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
