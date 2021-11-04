import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, AsyncStorage } from "react-native";
import { StyleSheet } from "react-native";
import firebase from "firebase";
import jwtDecode from "jwt-decode";
import { auth, Providers } from "../../config/firebase";
import Error from "../Error/Error";
import axios from "axios";
const PayPalLogin = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [authentication, setAuthentication] = useState<boolean>(false);
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
  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");
    setAuthentication(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // navigation.navigate("MyTabs");
        getIdToken();
      })
      .catch(() => {
        setError("Tài khoản hoặc mật khẩu không đúng.");
        setAuthentication(false);
      });
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

  const getAccessToken = async (idToken) => {
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/log-in?idToken=${idToken}`
      );
      if (response.status === 200) {
        await AsyncStorage.setItem("idToken", response.data);
        const decoded = jwtDecode(response.data);
        await AsyncStorage.setItem("infoUser", JSON.stringify(decoded));
        const alumni = await getAlumni(decoded.Id, response.data);
          navigation.navigate("Chi tiết thanh toán",{
            id: route.params.id
          });
        }

    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        style={{ height: 50, width: 120, marginVertical: 30, marginLeft: 134 }}
        source={require("../../assets/images/paypal.jpeg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "#000",
          fontWeight: "400",
        }}
      >
        Thanh toán với PayPay
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "#464748",
          marginVertical: 10,
        }}
      >
        Nhập email và mật khẩu để bắt đầu.
      </Text>
      <View style={{ marginHorizontal: 16 }}>
        {/* ====Input Email ===== */}
        <TextInput
          placeholder={'Email'}
          style={styles.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        {/* =====Input Password==== */}
        <TextInput
          placeholder={'Mật Khẩu'}
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
         <Error error={error} />
        {/* =====Button Next ==== */}
        <View style={styles.btnCon1}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => signInWithEmailAndPassword()}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.btnTxt}>Kế Tiếp</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* =====Line===== */}
        <View style={{marginVertical: 30, flexDirection:'row', alignItems:'center'}}>
          <View style={{height: 1, width: '44%', borderWidth: 0.5, borderColor:'#D7DCDF'}} />
          <Text style={{marginHorizontal: 6, color:'#797F83'}}>Hoặc</Text>
          <View style={{height: 1, width:'44%', borderWidth: 0.5, borderColor:'#D7DCDF'}}  />
        </View>

        {/* =====Button Debit or credit card  ==== */}
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            // onPress={() => setShowGateway(true)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.btnTxt1}>Thanh Toán với tín dụng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    fontSize: 18,
    borderColor: "#ddd",
    borderRadius: 3,
    elevation: 1,
    marginTop: 10,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  btnTxt1: {
    color: "#2C2E2E",
    fontSize: 20,
    fontWeight: "600",
  },

  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCon1: {
    height: 45,
    width: "100%",
    elevation: 1,
    backgroundColor: "#0170BA",
    borderRadius: 3,
    marginTop: 20,
  },
  btnCon: {
    height: 45,
    width: "100%",
    elevation: 1,
    backgroundColor: "#E1E7EA",
    borderRadius: 3,
  },
});
export default PayPalLogin;
