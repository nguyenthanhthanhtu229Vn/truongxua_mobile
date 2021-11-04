/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useState,
  Component,
  useLayoutEffect,
} from "react";
import {
  AsyncStorage,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  YellowBox,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { auth, Providers } from "../../config/firebase";
import Error from "../Error/Error";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/core";
import jwtDecode from "jwt-decode";
import { GiftedChat } from "react-native-gifted-chat";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
YellowBox.ignoreWarnings(["Setting a timer for a long period time"]);
const ChatMessage: React.FC = () => {
  const navigation = useNavigation();
  const moment = require("moment-timezone");
  const dateCreate = moment().tz("Asia/Ho_Chi_Minh").format();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();
  const chatsRef = db.collection("chats");
  const route = useRoute();
  const readUser = async () => {
    const infoUser = await AsyncStorage.getItem("infoUser");
    const objUser = JSON.parse(infoUser);
    console.log(objUser);
    setUser(objUser.Id);
    setName(objUser.AlumniName);
    setImg(objUser.Image);
  };

  useEffect(() => {
    readUser();
  }, []);

  useLayoutEffect(() => {
    const docid =
      route.params.idSend > route.params.idUser
        ? route.params.idUser + "-" + route.params.idSend
        : route.params.idSend + "-" + route.params.idUser;
    const unsubcribe = db
      .collection("chats")
      .doc(docid)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          }))
        )
      );
    return unsubcribe;
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    const docid =
      route.params.idSend > route.params.idUser
        ? route.params.idUser + "-" + route.params.idSend
        : route.params.idSend + "-" + route.params.idUser;
    db.collection("chats").doc(docid).collection("messages").add({
      _id,
      text,
      createdAt,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage={true}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: name,
        avatar: img,
        sentBy: route.params.idUser,
        sentTo: route.params.idSend,
      }}
    />
  );
};

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    width: width,
    borderWidth: 1,
    padding: 15,
    borderColor: "gray",
  },
});
export default ChatMessage;
