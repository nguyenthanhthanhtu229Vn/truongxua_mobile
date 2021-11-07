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
import jwtDecode from "jwt-decode";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const SignUp: React.FC = () => {
  const navigation = useNavigation();
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
  async function getAlumni(idAlumni, token) {
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/alumni/" + idAlumni,
        { headers }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const loadAccountToData = async (id) => {
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/sign-up?userId=` + id,
        {
          email,
          password,
        }
      );
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
      setError("Mật khẩu không trùng khớp");
      setRegistering(false);
    } else {
      if (error !== "") setError("");
      setRegistering(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          loadAccountToData(result.user?.uid);
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

  const getAccessToken = async (idToken) => {
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/log-in`,
        { idToken }
      );
      if (response.status === 200) {
        await AsyncStorage.setItem("idToken", response.data);
        const decoded = jwtDecode(response.data);
        await AsyncStorage.setItem("infoUser", JSON.stringify(decoded));
        const alumni = await getAlumni(decoded.Id, response.data);
        if (
          alumni.data.name == "" ||
          alumni.data.address == "" ||
          alumni.data.phone == "" ||
          alumni.data.bio == ""
        ) {
          navigation.navigate("Cập Nhập Hồ Sơ");
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
          Vui Lòng Đăng Ký
        </Text>
        <View style={{ marginTop: 24 }}>
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
                borderBottomColor: "#8e8e96",
                borderBottomWidth: 1,
                marginBottom: 14,
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
                borderBottomColor: "#8e8e96",
                borderBottomWidth: 1,
                fontSize: 18,
                marginBottom: 14,
                paddingBottom: 5,
              }}
              onChangeText={(confirm) => setConfirm(confirm)}
            />
          </View>
        </View>
        <Error error={error} />
        <TouchableOpacity onPress={() => signUpWithEmailAndPassword()}>
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
              Đăng ký
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              color: "#595050",
            }}
          >
            Hoặc
          </Text>
          <Text style={{ fontSize: 18, color: "#595050" }}>Đăng nhập bằng</Text>
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
          {/* Da co tai khoan */}
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text
              style={{
                color: "#8e8e96",
                fontSize: 16,
                textAlign: "center",
                // marginTop: 30,
                // textDecorationLine: "underline",
              }}
            >
              Đã có tài khoản?{" "}
              <Text
                style={{ color: COLORS.blue, textDecorationLine: "underline" }}
              >
                Đăng Nhập
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
