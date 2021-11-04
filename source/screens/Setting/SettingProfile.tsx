import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, icons, SIZES } from "../../constant";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
const SettingProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const schoolURL =
    "http://20.188.111.70:12348/api/v1/schools?sort=desc&pageNumber=0&pageSize=0";
  const [school, setSchool] = useState([]);
  const [schoolId, setSchoolId] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(schoolURL)
      .then((response) =>
        response.json().then((res) => {
          setSchool(res);
        })
      )
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  //update Profile
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [groupId, setGroupId] = useState(33);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [zalo, setZalo] = useState("");
  const [authorize, setAuthorize] = useState();
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState<boolean>(false);
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
  };

  // Pick Image
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      // setStatusChangeImg(true);
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
      alert(err);
    }
  };

  async function getAlumni(idAlumni, headers) {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/alumni/" + idAlumni,
        { headers }
      );
      if (response.status === 200) {
        if (response.data.name != null) {
          setName(response.data.name);
        }
        if (response.data.address != null) {
          setAddress(response.data.address);
        }
        if (response.data.phone != null) {
          setPhone(response.data.phone);
        }
        if (response.data.bio != null) {
          setBio(response.data.bio);
        }
        if (response.data.password != null) {
          setPassword(response.data.password);
        }
        if (response.data.email != null) {
          setEmail(response.data.email);
        }
        if (response.data.img != null) {
          setImage(response.data.img);
        }
        if (response.data.groupId != null) {
          setGroupId(response.data.groupId);
        }
        if (response.data.schoolId != null) {
          setSchoolId(response.data.schoolId);
        }
        if (response.data.instagram != null) {
          setInstagram(response.data.instagram);
        }
        if (response.data.facebook != null) {
          setFacebook(response.data.facebook);
        }
        if (response.data.zalo != null) {
          setZalo(response.data.zalo);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const UpdateProfile = async (headers) => {
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
            img: await uploadImage(image),
            bio,
            status,
            groupId,
            schoolId,
            facebook,
            instagram,
            zalo,
          },
          { headers }
        );
        if (response.status === 200) {
          alert("Cập Nhập Thành Công");
          navigation.navigate("MyTabs");
        }
      } catch (error) {
        alert(error);
        setRegistering(false);
      }
    }
  };

  useEffect(() => {
    tokenForAuthor();
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, []);

  return (
    <View>
      <Text style={style.title}>Chỉnh sửa hồ sơ</Text>
      <Text style={style.desc}>
        Mọi người sẽ biết bạn qua thông tin bên dưới
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={pickImg} style={{ zIndex: 1 }}>
          <Image source={{ uri: image }} style={style.avtImg} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "relative",
          marginTop: 30,
          borderWidth: 0.4,
          height: 40,
          bottom: 10,
          padding: 10,
          borderRadius: 6,
        }}
      >
        <RNPickerSelect
          disabled
          pickerProps={{ style: { overflow: "hidden" } }}
          value={schoolId}
          onValueChange={(ids) => setSchoolId(ids)}
          items={school.map((item) => ({ label: item.name, value: item.id }))}
        />
      </View>
      {/* =====Email====== */}
      <Text style={style.subTitle}>Email</Text>
      <TextInput
        editable={false}
        style={style.input}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      {/* =====Name====== */}
      <Text style={style.subTitle}>Họ và tên</Text>
      <TextInput
        style={style.input}
        value={name}
        onChangeText={(name) => setName(name)}
      />
      {/* =====Password====== */}
      {/* <Text style={style.subTitle}>Mật Khẩu</Text>
      <TextInput
        editable={false}
        secureTextEntry
        style={style.input}
        value={password}
        onChangeText={(password) => setPassword(password)}
      /> */}
      {/* =======Address===== */}
      <Text style={style.subTitle}>Địa Chỉ </Text>
      <TextInput
        style={style.input}
        value={address}
        onChangeText={(address) => setAddress(address)}
      />

      {/* =====Phone ====== */}
      <Text style={style.subTitle}>Số Điện Thoại</Text>
      <TextInput
        style={style.input}
        value={phone}
        onChangeText={(phone) => setPhone(phone)}
      />

      {/* =====Description yourseft == */}
      <Text style={style.subTitle}>Miêu Tả Bản Thân </Text>
      <TextInput
        style={style.input}
        multiline={true}
        value={bio}
        onChangeText={(bio) => setBio(bio)}
      />
      {/* =====Instagram === */}
      <Text style={style.subTitle}>Instagram</Text>
      <TextInput
        style={style.input}
        value={instagram}
        onChangeText={(instagram) => setInstagram(instagram)}
      />
      {/* =====FaceBook==== */}
      <Text style={style.subTitle}>FaceBook</Text>
      <TextInput
        style={style.input}
        value={facebook}
        onChangeText={(facebook) => setFacebook(facebook)}
      />
      {/* =====Zalo=== */}
      <Text style={style.subTitle}>Zalo</Text>
      <TextInput
        style={style.input}
        value={zalo}
        onChangeText={(zalo) => setZalo(zalo)}
      />

      <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}>
        <TouchableOpacity
          style={style.saveBtn}
          onPress={() => UpdateProfile(authorize)}
        >
          <Text style={style.saveText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Danh Mục")}
          style={style.cancelBtn}
        >
          <Text style={style.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  avtImg: {
    borderRadius: 60,
    height: 120,
    width: 120,
    borderColor: "#d1cfcf",
    borderWidth: 2,
  },
  title: {
    color: "black",
    fontSize: 18,
  },
  desc: {
    color: "#4d4d82",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 20,
    flex: 2,
  },
  saveBtn: {
    backgroundColor: "#088dcd",
    borderRadius: 10,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
  },
  cancelText: {
    color: "#088dcd",
    fontSize: 18,
  },
  saveText: {
    color: "white",
    fontSize: 18,
  },
  cancelBtn: {
    borderColor: "#088dcd",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  changeImg: {
    fontSize: 16,
    color: "#088dcd",
    marginLeft: 20,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    fontSize: 18,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
  },
  btnGender: {
    backgroundColor: "white",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: SIZES.largeTitle,
    marginRight: 20,
    marginTop: 15,
  },
  btnGenderActive: {
    borderColor: "#088dcd",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: SIZES.largeTitle,
    marginRight: 20,
    marginTop: 15,
  },
  btnInGenderActive: {
    position: "absolute",
    top: 4,
    left: 5,
    width: 14,
    height: 14,
    borderRadius: SIZES.largeTitle,
    backgroundColor: "#088dcd",
  },
  btnInGender: {
    borderColor: "white",
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: SIZES.largeTitle,
    marginRight: 20,
    marginTop: 15,
  },
});
export default SettingProfile;
