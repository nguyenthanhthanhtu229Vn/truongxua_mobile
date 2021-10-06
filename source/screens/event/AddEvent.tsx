import React from "react";
import { View, Text } from "../../../components/Themed";
import { COLORS, FONTS } from "../../constant";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
const AddEvent = () => {
  return (
    <View style={{flexDirection:'column'}}>
      <View
        style={{
          backgroundColor: "#088dcd",
          height: 70,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.white2,
            fontWeight: "700",
            marginLeft: 10,
          }}
        >
          Create Event
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            fontWeight: "400",
            marginRight: 10,
          }}
        >
         Create Event/Blog
        </Text>
      </View>
      <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
        <View style={style.line} />
        <Text style={style.header}>Create New Event </Text>
      </View>   
      <View style={{marginHorizontal: 16}}>
       <TextInput placeholder='Personal Event' style={style.input} />
       <TextInput placeholder='Event Name' style={style.input} />
       <TextInput placeholder='Select Category' style={style.input} />
        <View style={{marginTop: 10, marginBottom: 30}}><Text>Upload Image</Text></View>
       <TextInput  placeholder='Website URL' style={style.input} />
       <TextInput multiline  placeholder='Description' style={style.inputDes} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    ...FONTS.h3,
    color: COLORS.black,
    fontWeight: "500",
    fontSize: 20,
    position: "relative",
    bottom: 24,
    left: 8,
  },
  line: {
    height: 22,
    width: 4,
    backgroundColor: "#088dcd",
  },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        fontFamily: "Roboto",
        fontSize: 18,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        marginBottom: 10,
      },
      inputDes: {
        backgroundColor: "white",
        padding: 70,
        borderWidth: 1,
        fontFamily: "Roboto",
        fontSize: 18,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        marginBottom: 10,
      },
});
export default AddEvent;
