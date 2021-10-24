/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, ImageBackground, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
import SignUp from "./SignUp";
import { auth, Providers } from "../../config/firebase";
import Error from "../Error/Error";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { COLORS } from "../../constant";
import jwtDecode from "jwt-decode";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
// username: Huytq@gmail.com
// password: 123456
const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const baseUrl = "http://20.188.111.70:12348";
  const [authentication, setAuthentication] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  async function getAlumni(idAlumni) {
    try {
      const response = await axios.get(
        "http://20.188.111.70:12348/api/v1/alumni/" + idAlumni
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");
    setAuthentication(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // navigation.navigate("MyTabs");
        getIdToken();
      })
      .catch((error) => {
        setError("Tài khoản hoặc mật khẩu không đúng.");
        setAuthentication(false);
      });
  };

  const getAccessToken = async (idToken) => {
    try {
      const response = await axios.post(
        `http://20.188.111.70:12348/api/users/log-in?idToken=${idToken}`
      );
      if (response.status === 200) {
        await AsyncStorage.setItem("idToken", response.data);
        const decoded = jwtDecode(response.data);
        await AsyncStorage.setItem("infoUser", JSON.stringify(decoded));
        const alumni = await getAlumni(decoded.Id);
        if (
          alumni.data.name == "" ||
          alumni.data.address == "" ||
          alumni.data.phone == "" ||
          alumni.data.bio == ""
        ) {
          navigation.navigate("UpdateProfile");
        } else {
          navigation.navigate("MyTabs");
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const getIdToken = () => {
    firebase
      .auth()
      .currentUser?.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        getAccessToken(idToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "207933358538-rm1ntu3dcvh33mnb6cmfnmuvfiib6tjr.apps.googleusercontent.com",
        clientId:
          "190415757946-l541710id73mv9qjgs1a9516miemb0om.apps.googleusercontent.com",
        iosClientId:
          "207933358538-ul19uo0aktcu9kkk59fo1jfq29munncu.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        firebase
          .auth()
          .signInWithCredential(googleCredential)
          .then(() => {
            getIdToken();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  return (
    <View style={{ flex: 1, padding: 20, marginTop: 60 }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.5,
          width: width,
          bottom: 0,
        }}
      ></View>
      <Image
        source={require("../../assets/images/imgSignIn/logoSchool.png")}
        style={{ width: 100, height: 100, alignSelf: "center", marginTop: 50 }}
      ></Image>
      <Text
        style={{
          color: COLORS.black,
          fontSize: 30,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        Đăng Nhập
      </Text>
      <View style={{ marginTop: 40 }}>
        <View style={{ position: "relative", marginBottom: 20 }}>
          <Feather
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
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            placeholderTextColor="#8e8e96"
            style={{
              borderBottomColor: "#8e8e96",
              borderBottomWidth: 1,
              fontSize: 18,
              paddingBottom: 5,
            }}
          />
        </View>
      </View>
      <Error error={error} />
      {/* ====== Toauch Opacity Dang Nhap ======*/}
      <TouchableOpacity onPress={() => signInWithEmailAndPassword()}>
        <View
          style={{
            backgroundColor: "#088dcd",
            width: "100%",
            borderRadius: 25,
            marginTop: 50,
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
            Đăng nhập
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            color: "#8e8e96",

            fontSize: 16,
            textAlign: "center",
            marginTop: 30,
            textDecorationLine: "underline",
          }}
        >
          Quên mật khẩu?
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            color: "#595050",
          }}
        >
          Hoặc
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
          <TouchableOpacity
            // onPress={() => signInWithSocialMedia(Providers.google)}
            onPress={() => signInWithGoogleAsync()}
          >
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
        {/* Ban co tai khoan chua  */}
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#8e8e96", fontSize: 16 }}>
              Bạn Chưa Có Tài Khoản{" "}
              <Text
                style={{ textDecorationLine: "underline", color: COLORS.blue }}
              >
                Đăng Ký
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* End  */}
      </View>
    </View>
  );
};

export default SignIn;
