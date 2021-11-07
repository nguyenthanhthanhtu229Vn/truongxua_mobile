import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  ScrollView,
} from "react-native";
import { icons } from "../../constant";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
const PaypalDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [eventId, setEventId] = useState();
  console.log(eventId);
  const [alumniId, setAlumniId] = useState("");
  const [dateDonante, setDateDonante] = useState(dateCreate);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [amount, setAmount] = useState("");
  const [authorize, setAuthorize] = useState();
  const [eventDetail, setEventDetail] = useState<string>("");
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setAlumniId(objUser.Id);

    const headers = {
      Authorization: "Bearer " + token,
    };
    setAuthorize(headers);
  };

  //Create donations
  const createDonate = async (headers) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/donates",
        {
          eventId,
          alumniId,
          dateDonante,
          paymentMethod,
          amount,
        },
        { headers }
      );
      if (response.status === 200) {
        setAmount("0");
        registerEvent(headers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerEvent = async (headers) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/eventinalumni",
        {
          eventId: eventId,
          alumniId: alumniId,
        },
        { headers }
      );
      if (response.status === 200) {
        alert("Đăng ký tham gia thành công");
        navigation.navigate("Chi Tiết Sự Kiện", { id: route.params.id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setEventId(route.params.id);
    tokenForAuthor();
  }, []);

  return (
    <ScrollView>
      <View style={{ marginTop: 40, flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            marginHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../../assets/images/paypal.jpeg")}
            style={{ height: 50, width: 120 }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={icons.card}
              style={{ height: 22, width: 22, marginRight: 8 }}
            />
            <Text style={{ fontSize: 16, color: "#38393A" }}>{amount} VND</Text>
          </View>
        </View>
        {/* ======Name ==== */}
        <View
          style={{
            height: 70,
            backgroundColor: "#eff1f1",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8",
            marginBottom: 20,
          }}
        >
          <Text style={{ marginLeft: 10, fontSize: 20, marginVertical: 20 }}>
            Xin Chào , Huy
          </Text>
        </View>

        {/* ====Text Donate==== */}
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.subTitle}>Quyên Góp (VND)</Text>
          <TextInput
            keyboardType={"number-pad"}
            style={styles.input}
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
          />
        </View>

        {/* =====Pay with ==== */}
        <View style={{ marginHorizontal: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, color: "#575859" }}>Thanh toán với</Text>

          {/* =====Method payment=== */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: 200,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CircleCheckBox
                styleCheckboxContainer={{}}
                innerColor={"#0170BA"}
                outerColor={"#CFD0D1"}
                checked={true}
                onToggle={(checked) => console.log(checked)}
                labelPosition={LABEL_POSITION.RIGHT}
              />
              <Image
                source={icons.paypal_icons}
                style={{ height: 30, width: 30 }}
              />
              <Text
                style={{
                  color: "#515353",
                  fontSize: 18,
                }}
              >
                Cân Bằng
              </Text>
            </View>

            <Text style={{ color: "#515353", fontSize: 16, fontWeight: "500" }}>
              {amount} VND
            </Text>
          </View>
          {/* ====Visa====  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 328,
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 100,
                justifyContent: "space-between",
              }}
            >
              <CircleCheckBox
                styleCheckboxContainer={{}}
                innerColor={"#0170BA"}
                outerColor={"#CFD0D1"}
                checked={false}
                onToggle={(checked) => console.log("My state is: ", checked)}
                labelPosition={LABEL_POSITION.RIGHT}
              />
              <Image
                source={icons.visa}
                style={{
                  height: 30,
                  width: 30,
                  position: "relative",
                  right: 10,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Text style={{ color: "#515353", fontSize: 18 }}>Visa</Text>
              <Text
                style={{ color: "#515353", fontSize: 16, fontWeight: "500" }}
              >
                Tín dụng ****5351
              </Text>
            </View>
          </View>
          {/* ======Cong doan ===== */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 100,
                justifyContent: "space-between",
              }}
            >
              <CircleCheckBox
                styleCheckboxContainer={{}}
                innerColor={"#0170BA"}
                outerColor={"#CFD0D1"}
                checked={false}
                onToggle={(checked) => console.log("My state is: ", checked)}
                labelPosition={LABEL_POSITION.RIGHT}
              />
              <Image
                source={icons.bank}
                style={{
                  height: 30,
                  width: 30,
                  position: "relative",
                  right: 10,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ color: "#515353", fontSize: 18 }}>
                Công đoàn tín dụng
              </Text>
              <Text
                style={{ color: "#515353", fontSize: 16, fontWeight: "500" }}
              >
                Đang kiểm tra ****5351
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "#137BBF",
              fontSize: 18,
              marginVertical: 18,
              fontWeight: "400",
            }}
          >
            {" "}
            + Thêm thẻ tín dụng và ghi nợ
          </Text>

          {/* =====Pay later New===== */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 220,
                justifyContent: "space-evenly",
                marginTop: 8,
              }}
            >
              <Text style={{ color: "#434446", fontSize: 20 }}>
                Thanh toán sau
              </Text>
              <TouchableOpacity
                style={{
                  height: 25,
                  width: 60,
                  backgroundColor: "#137BBF",
                  borderRadius: 4,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    textAlign: "center",
                    paddingTop: 2,
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Mới{" "}
                </Text>
              </TouchableOpacity>
            </View>
            {/* ====paypal credit=== */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // width: 300,
                alignItems: "center",
                marginVertical: 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: 100,
                }}
              >
                <CircleCheckBox
                  styleCheckboxContainer={{}}
                  innerColor={"#0170BA"}
                  outerColor={"#CFD0D1"}
                  checked={false}
                  onToggle={(checked) => console.log("My state is: ", checked)}
                  labelPosition={LABEL_POSITION.RIGHT}
                />
                <Image
                  source={icons.paypal_credit}
                  style={{
                    height: 30,
                    width: 30,
                    position: "relative",
                    right: 10,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#515353", fontSize: 18, fontWeight: "600" }}
                >
                  Thẻ Tín Dụng Paypal
                </Text>
                <Text
                  style={{
                    color: "#515353",
                    fontSize: 14,
                    fontWeight: "500",
                    marginVertical: 2,
                  }}
                >
                  Áp dụng cho thẻ tín dụng paypal credit
                </Text>
                <Text
                  style={{
                    color: "#515353",
                    fontSize: 14,
                    fontWeight: "500",
                    marginVertical: 2,
                  }}
                >
                  Thanh toán theo thời gian bạn mua
                </Text>
                <Text
                  style={{
                    color: "#515353",
                    fontSize: 14,
                    fontWeight: "500",
                    marginVertical: 2,
                  }}
                >
                  {amount} VND với PayPal Credit.
                </Text>
                <Text
                  style={{
                    color: "#515353",
                    fontSize: 14,
                    fontWeight: "500",
                    // textAlign: "center",
                    marginVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#0170BA",
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    Xem các điều khoản
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/* ======bnt pay now ===== */}
          <View>
            <View
              style={{
                height: 1,
                width: "100%",
                borderWidth: 0.9,
                borderColor: "#D7DCDF",
              }}
            />
            <View style={styles.btnCon1}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => createDonate(authorize)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.btnTxt}>Thanh Toán</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 1,
                width: "100%",
                borderWidth: 0.9,
                borderColor: "#D7DCDF",
                marginTop: 30,
              }}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: 16,
              color: "#696A6B",
              marginVertical: 16,
            }}
          >
            Xem{" "}
            <Text style={{ color: "#0170BA", fontWeight: "500", fontSize: 15 }}>
              Chính Sách Paypal{" "}
            </Text>{" "}
            và phưong thức thanh toán
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnTxt: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCon1: {
    height: 56,
    width: "100%",
    elevation: 1,
    backgroundColor: "#0170BA",
    borderRadius: 3,
    marginTop: 20,
  },
  subTitle: {
    // marginTop: 10,
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    fontSize: 18,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 8,
    width: 370,
  },
});
export default PaypalDetails;
