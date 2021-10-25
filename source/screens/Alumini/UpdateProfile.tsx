/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, ImageBackground, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import { COLORS, icons } from "../../constant";
import Error from "../Error/Error";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from 'react-native';
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const UpdateProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const baseUrl = "http://20.188.111.70:12348";
  const navigation = useNavigation();
  const [id, setId] = useState<string>("");
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [img, setImg] = useState<string>(
    "https://1.bp.blogspot.com/--feZt7VOE1I/WKffpcr7UHI/AAAAAAAACyY/Mro30dfNA3M4C5fAr-gP26V8avY2XVk8ACLcB/s1600/anh-dai-dien-facebook-doc-1.jpg"
  );
  const [status, setStatus] = useState<boolean>(true);
  const [groupId, setGroupId] = useState(33);
  const [schoolId, setSchoolId] = useState(5);
  const [alumni, setAlumni] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  // getAllSchool
  const schoolURL = `${baseUrl}/api/v1/schools?sort=desc&pageNumber=0&pageSize=0`;
  const [school, setSchool] = useState([]);
  useEffect(() => {
    fetch(schoolURL)
      .then((response) =>
        response.json().then((res) => {
          setSchool(res);
        })
      )
      .catch((error) => alert(error))
      .finally(() => setLoading(false))
  }, []);
// console.log(school);
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setId(objUser.Id);
  };

  async function getAlumni(idAlumni) {
    try {
      const response = await axios.get(
        "http://20.188.111.70:12348/api/v1/alumni/" + idAlumni
      );
      setAlumni(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    tokenForAuthor();
    getAlumni(id);
    // if (alumni.name != null) {
    //   setName(alumni.name);
    // }
    if (alumni.password != null) {
      setPassword(alumni.password);
    }
    if (alumni.email != null) {
      setEmail(alumni.email);
    }
    // if (alumni.address != null) {
    //   setAddress(alumni.address);
    // }
    // if (alumni.phone != null) {
    //   setPhone(alumni.phone);
    // }
    // if (alumni.bio != null) {
    //   setBio(alumni.bio);
    // }
    if (alumni.img != null) {
      setImg(alumni.img);
    }
    if (alumni.groupId != null) {
      setGroupId(alumni.groupId);
    }
    if (alumni.schoolId != null) {
      setSchoolId(alumni.schoolId);
    }
  });

  const UpdateProfile = async () => {
    if (
      name.length == 0 ||
      address.length == 0 ||
      phone.length == 0 ||
      bio.length == 0
    ) {
      setError("Không Được Để Trống");
      setRegistering(false);
    } else if (phone.length != 10) {
      setError("Số điện thoại 10 chữ số");
      setRegistering(false);
    }else{
      if (error !== ""){
        setRegistering(true);
        axios({
          url: "http://20.188.111.70:12348/api/v1/alumni?id=" + id,
          method: "PUT",
          data: {
            password,
            email,
            phone,
            name,
            address,
            bio,
            img,
            status,
            groupId,
            schoolId,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Cập Nhập Thành Công");
              navigation.navigate("MyTabs");
            } else {
              throw new Error("Đã Xảy Ra Lỗi ");
            }
          })
          .catch((error) => {
            alert(error);
            setRegistering(false);
          });
      }
}
}
  return (
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <ScrollView>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.5,
            width: width,
            bottom: 0,
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
          Cập Nhập Thông Tin
        </Text>
        <View style={{ position: "relative", marginTop: 15 }}>
        <DropDownPicker
            stickyHeader
            style={style.input}
            open={open}
            value={value}
            items={school.map(item=> ({label:item.name,value:item.id}))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setSchool}
          />
        </View>
        {/* =====End School Name ===== */}

        {/* =======Fullname======== */}
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
              borderBottomColor: "#8e8e96",
              borderBottomWidth: 1,
              marginBottom: 10,
              fontSize: 18,
              paddingBottom: 5,
            }}
          />
        </View>
        {/* ======address====== */}
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
              borderBottomColor: "#8e8e96",
              borderBottomWidth: 1,
              marginBottom: 10,
              fontSize: 18,
              paddingBottom: 5,
            }}
          />
        </View>
        {/* =======Phone====== */}
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
            onChangeText={(phone) => setPhone(phone)}
            value={phone}
            placeholderTextColor="#8e8e96"
            style={{
              borderBottomColor: "#8e8e96",
              borderBottomWidth: 1,
              marginBottom: 10,
              fontSize: 18,
              paddingBottom: 5,
            }}
          />
        </View>
        {/* ========Bio====== */}
        <View style={{ position: "relative", marginTop: 15 }}>
          <TextInput
            multiline
            placeholder="Miêu Tả Bản Thân"
            onChangeText={(bio) => setBio(bio)}
            value={bio}
            placeholderTextColor="#8e8e96"
            style={{
              borderBottomColor: "#8e8e96",
              borderBottomWidth: 1,
              marginBottom: 10,
              fontSize: 18,
              paddingBottom: 5,
            }}
          />
        </View>
        <Error error={error} />
        <TouchableOpacity onPress={UpdateProfile}>
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
              Lưu
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 0.4,
    fontSize: 18,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 140
  },
})

export default UpdateProfile;
