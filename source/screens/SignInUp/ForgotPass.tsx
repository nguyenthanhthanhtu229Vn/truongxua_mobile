/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { AsyncStorage, Image, ImageBackground, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";
import firebase from "firebase";
import Animated, { event } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { auth } from "../../config/firebase";
import * as Google from "expo-google-app-auth";
import Error from "../Error/Error";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { COLORS } from "../../constant";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const ForgotPass: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetPasswordRequest = () => {
    if (error != "") setError("");
    setSending(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // logging.info("Email sent.");
        setSent(true);
      })
      .catch((error) => {
        if (error == "The email address is badly formatted") {
          setError("Vui lòng nhập email");
        }
        setError("Email chưa có vui lòng đăng ký");
        setSending(false);
      });
  };
  return (
    <View style={{ flex: 1, padding: 20, marginTop: 90 }}>
      <ScrollView>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            // backgroundColor: "black",
            opacity: 0.5,
            width: width,
            bottom: 0,
          }}
        />
        <Image
          source={require("../../assets/images/imgSignIn/logoSchool.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: COLORS.black,
            fontSize: 30,
            fontWeight: "500",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          Quên mật khẩu
        </Text>
        <View style={{ marginTop: 24 }}>
          {sent ? (
            <View>
              <Text
                style={{
                  color: "#088dcd",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Đã gửi đến email của bạn vui lòng xác nhận
              </Text>
            </View>
          ) : (
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
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                value={email}
                placeholderTextColor="#8e8e96"
                style={{
                  borderBottomColor: "#8e8e96",
                  borderBottomWidth: 1,
                  fontSize: 18,
                  paddingBottom: 5,
                  marginBottom: 14,
                }}
              />
            </View>
          )}
        </View>
        <Error error={error} />
        <TouchableOpacity onPress={() => resetPasswordRequest()}>
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              borderRadius: 25,
              marginTop: 20,
              padding: 17,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",

                fontSize: 20,
              }}
            >
              Xác nhận gửi
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ForgotPass;
