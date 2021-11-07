/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { COLORS } from "../../constant";
import Error from "../Error/Error";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const UpdateProfile: React.FC = () => {
  const navigation = useNavigation();
  const [id, setId] = useState<string>("");
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [image, setImage] = useState<string>(
    "https://1.bp.blogspot.com/--feZt7VOE1I/WKffpcr7UHI/AAAAAAAACyY/Mro30dfNA3M4C5fAr-gP26V8avY2XVk8ACLcB/s1600/anh-dai-dien-facebook-doc-1.jpg"
  );
  const [status, setStatus] = useState<boolean>(true);
  const [groupId, setGroupId] = useState();
  const [schoolId, setSchoolId] = useState();
  const [alumni, setAlumni] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [authorize, setAuthorize] = useState();
  const [schoolYearId, setSchoolYearId] = useState();
  const [schoolYear, setSchoolYear] = useState(Array);
  const [visible, setVisible] = useState(false);
  const tokenForAuthor = async () => {
    const token = await AsyncStorage.getItem("idToken");
    //
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    setId(objUser.Id);
    const headers = {
      Authorization: "Bearer " + token,
      // "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCIsIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiI6IiovKiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFxbHM1OFdWaURYN1lDZEUzd0FjVTlwdTlqZjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiSWQiOiIxIiwiU2Nob29sSWQiOiIiLCJHcm91cElkIjoiIiwiZXhwIjoxNjM1MjM2OTE4LCJpc3MiOiJsb2NhbGhvc3Q6MTIzNDciLCJhdWQiOiJsb2NhbGhvc3Q6MTIzNDcifQ.oOnpxsz5hYQuFhq1ikw4Gy-UN_vor3y31neyOFehJ_Y",
    };
    setAuthorize(headers);
    getAlumni(objUser.Id, headers);
    loadSchool(headers);
    loadSchoolYear(headers);
  };

  const loadSchool = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/schools?pageNumber=0&pageSize=0",
        { headers }
      );
      if (response.status === 200) {
        setSchool(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadSchoolYear = async (headers) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/schools/schoolyears?pageNumber=0&pageSize=0",
        { headers }
      );
      if (response.status === 200) {
        for (let i = 0; i < schoolYear.length; i++) {
          schoolYear.splice(i--, 1);
        }
        for (let i = 0; i < response.data.length; i++) {
          if (schoolId == response.data[i].schoolId) {
            schoolYear.push(response.data[i]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // getAllSchool
  const [school, setSchool] = useState([]);
  const [statusChangeImg, setStatusChangeImg] = useState(false);
  //Pick Image
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setStatusChangeImg(true);
    }
  };
  const uploadImage = async (imgPick) => {
    let filename = imgPick.split("/").pop();
    let body = new FormData();
    body.append("image", {
      uri: imgPick,
      name: filename,
      type: "image/jpeg",
    });
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload?key=8ce611088e16144c16f12e63289df341",
        data: body,
      });
      if (response.status == 200) {
        return response.data.data.display_url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function getAlumni(idAlumni, headers) {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/alumni/" + idAlumni,
        { headers }
      );
      if (response.status === 200) {
        // setAlumni(response.data);
        if (response.data.password != null) {
          setPassword(response.data.password);
        }
        if (response.data.email != null) {
          setEmail(response.data.email);
        }
        if (response.data.img != null) {
          setImage(response.data.img);
        }
        if (response.data.schoolId != null) {
          setSchoolId(response.data.schoolId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    tokenForAuthor();
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, [visible]);

  const UpdateProfile = async (headers) => {
    if (
      name.length == 0 ||
      address.length == 0 ||
      phone.length == 0 ||
      bio.length == 0 ||
      schoolId == null ||
      schoolYear == null
    ) {
      setError("Không Được Để Trống");
      setRegistering(false);
    } else if (phone.length != 10) {
      setError("Số điện thoại 10 chữ số");
      setRegistering(false);
    } else {
      setRegistering(true);
      try {
        const response = await axios.put(
          "https://truongxuaapp.online/api/v1/alumni?id=" + id,
          {
            email,
            name,
            password,
            phone,
            address,
            img: statusChangeImg === false ? image : await uploadImage(image),
            bio,
            status,
            schoolId,
          },
          { headers }
        );
        if (response.status === 200) {
          await featchGroup(headers, id, schoolYearId);
        }
      } catch (error) {
        setRegistering(false);
      }
    }
  };

  const featchGroup = async (headers, id, schoolYearId) => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/schoolyears/" +
          schoolYearId +
          "/groups",
        { headers }
      );
      if (response.status === 200) {
        await addGroupForAlumni(headers, id, response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addGroupForAlumni = async (headers, id, listGroup) => {
    try {
      for (let i = 0; i < listGroup.length; i++) {
        const response = await axios.post(
          "https://truongxuaapp.online/api/v1/alumniingroup",
          {
            classId: listGroup[i].id,
            alumniId: id,
          },
          { headers }
        );
      }
      alert("Cập Nhập Thành Công");
      const infoUser = await AsyncStorage.getItem("infoUser");
      const objUser = JSON.parse(infoUser);
      objUser.SchoolId = schoolId;
      objUser.AlumniName = name;
      objUser.Image =
        statusChangeImg === false ? image : await uploadImage(image);
      AsyncStorage.setItem("infoUser", JSON.stringify(objUser));
      navigation.navigate("MyTabs");
    } catch (error) {
      console.log(error);
    }
  };
  const formateDate = (date) => {
    const day = new Date(date);
    return day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear();
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 20, marginTop: 30 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <ScrollView> */}
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
        <Error error={error} />
        <View
          style={{
            position: "relative",
            marginTop: 15,
            borderWidth: 0.4,
            height: 40,
            bottom: 10,
            padding: 10,
            borderRadius: 6,
          }}
        >
          <RNPickerSelect
            pickerProps={{ style: { overflow: "hidden" } }}
            placeholder={{
              label: "Chọn trường",
            }}
            value={schoolId}
            onOpen={() => setVisible(!visible)}
            onClose={() => setVisible(!visible)}
            onValueChange={(ids) => {
              setSchoolId(ids), setVisible(!visible);
            }}
            items={school.map((item) => ({ label: item.name, value: item.id }))}
          />
        </View>
        {/* =====End School Name ===== */}

        {/*SchoolYearId  */}
        {schoolYear.length != 0 ? (
          <View
            style={{
              position: "relative",
              marginTop: 15,
              borderWidth: 0.4,
              height: 40,
              bottom: 10,
              padding: 10,
              borderRadius: 6,
            }}
          >
            <RNPickerSelect
              pickerProps={{ style: { overflow: "hidden" } }}
              onOpen={() => setVisible(!visible)}
              onClose={() => setVisible(!visible)}
              disabled={schoolYear.length != 0 ? false : true}
              placeholder={{
                label: "Chọn niên khóa",
              }}
              value={schoolYearId}
              onValueChange={(id) => setSchoolYearId(id)}
              items={schoolYear.map((item) => ({
                label:
                  formateDate(item.startDate) +
                  " - " +
                  formateDate(item.endDate),
                value: item.id,
              }))}
            />
          </View>
        ) : null}
        {/* =====End School Year ===== */}

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
        <TouchableOpacity
          onPress={pickImg}
          style={{ flexDirection: "row", marginTop: 20 }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/icons/imageGallery.png")}
          />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Chọn hình ảnh</Text>
        </TouchableOpacity>
        {image != null ? (
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginRight: 10 }}
            />
          </View>
        ) : null}
        {/* </ScrollView> */}
        <TouchableOpacity onPress={() => UpdateProfile(authorize)}>
          <View
            style={{
              backgroundColor: "#088dcd",
              width: "100%",
              borderRadius: 25,
              marginTop: 20,
              padding: 17,
              marginBottom: 20,
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginTop: 20,
  },
});

export default UpdateProfile;
