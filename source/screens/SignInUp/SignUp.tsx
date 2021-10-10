/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
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
  Entypo,
} from "@expo/vector-icons";
import firebase from "firebase";
import Animated, { event } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { auth } from "../../config/firebase";
import * as Google from "expo-google-app-auth";
import Error from "../Error/Error";
import axios from "axios";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const SignUp: React.FC = ({ navigation }) => {
  const baseUrl = "http://20.188.111.70:12348";
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  // const history=useHistory();
  const loadAccountToData = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/Alumni`, {
        email,
        name,
        password,
        phone,
        address,
        img,
        bio,
        status,
      });
      if (response.status === 200) {
        alert("Đăng ký thành công");
        navigation.navigate("SignIn");
      }
    } catch (error) {
      alert("Đăng ký không thành công");
      setRegistering(false);
    }
  };

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError("Mật khẩu khùng trùng khớp");
      setRegistering(false);
    } else if (name.length == 0 || phone.length == 0) {
      setError("Không được để nội dung trống");
      setRegistering(false);
    } else if (phone.length != 10) {
      setError("Số điện thoại 10 chữ số");
      setRegistering(false);
    } else {
      if (error !== "") setError("");
      setRegistering(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          loadAccountToData();
        })
        .catch((error) => {
          if (error.code.includes("auth/weak-password")) {
            setError("Mật khẩu quá yếu");
          } else if (error.code.includes("auth/invalid-email")) {
            setError("Email chưa đúng. Vui lòng thử lại");
          } else {
            setError("Email đã được sử dụng");
          }
          setRegistering(false);
        });
    }
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
            navigation.navigate("MyTabs");
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
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
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
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
          <View style={{ marginTop: 20 }}>
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
                placeholder="Email đăng nhập"
                onChangeText={(email) => setEmail(email)}
                value={email}
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
                onChangeText={(password) => setPassword(password)}
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
                onChangeText={(confirm) => setConfirm(confirm)}
              />
            </View>
          </View>
          <View style={{ position: "relative", marginTop: 15 }}>
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
              placeholder="Họ và tên"
              onChangeText={(name) => setName(name)}
              value={name}
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
            <Entypo
              name="location-pin"
              style={{
                color: "#8e8e96",
                position: "absolute",
                right: 0,
                fontSize: 18,
              }}
            />
            <TextInput
              placeholder="Địa chỉ"
              onChangeText={(address) => setAddress(address)}
              value={address}
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
              name="phone"
              style={{
                color: "#8e8e96",
                position: "absolute",
                right: 0,
                fontSize: 18,
              }}
            />
            <TextInput
              placeholder="Số điện thoại"
              keyboardType="number-pad"
              onChangeText={(phone) => setPhone(phone)}
              value={phone}
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
          <Error error={error} />
          <TouchableOpacity onPress={() => signUpWithEmailAndPassword()}>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
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
              marginTop: 80,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  flexDirection: "row",
                  marginRight: 30,
                  borderRadius: 250,
                }}
              >
                <Feather
                  name="key"
                  style={{
                    color: "#000",
                    marginRight: 5,
                    marginTop: 2,
                    fontSize: 16,
                  }}
                ></Feather>
                <Text
                  style={{ color: "#000", fontFamily: "Roboto", fontSize: 16 }}
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
                  backgroundColor: "#088dcd",
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
                    color: "white",
                    marginRight: 5,
                    marginTop: 2,
                    fontSize: 16,
                  }}
                ></SimpleLineIcons>
                <Text
                  style={{ color: "white", fontFamily: "Roboto", fontSize: 16 }}
                >
                  Đăng ký
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
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
          <Text
            style={{ fontFamily: "Roboto", fontSize: 18, color: "#595050" }}
          >
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
            <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
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
      </ScrollView>
    </View>
  );
};

export default SignUp;
