import React from "react";
import { View,Text,Image,FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../../constant";

const MemberSchool = [
    {
      avatar: require("../../assets/images/event.jpg"),
      name: "Bryan Tran",
    },
    {
      avatar: require("../../assets/images/event.jpg"),
      name: "Bryan Tran",
    },
    {
      avatar: require("../../assets/images/event.jpg"),
      name: "Bryan Tran",
    },
    {
      avatar: require("../../assets/images/event.jpg"),
      name: "Bryan Tran",
    },
  ];
const Member = () => {
    return(
<View
          style={{
            marginHorizontal: 10,
            marginTop: 30,
            width: 370,
            backgroundColor: COLORS.white,
            borderWidth: 0.5,
            borderColor: "#E1E8EC",
            borderRadius: 6,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                height: 22,
                width: 4,
                backgroundColor: "#088dcd",
                marginBottom: 6,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                fontWeight: "600",
                color: COLORS.black,
                marginBottom: 8,
              }}
            >
              Member
            </Text>
          </View>
          {/* ======su kien */}
          <View>
            <FlatList
              numColumns={2}
              data={MemberSchool}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      backgroundColor: "#f7f4f4",
                      height: 200,
                      width: 150,
                      marginHorizontal: 20,
                      borderRadius: 10,
                      marginBottom: 20,
                      borderWidth: 0.5,
                      borderColor: "#E1E8EC",
                    }}
                  >
                    <Image
                      source={item.avatar}
                      style={{
                        height: 100,
                        width: 100,
                        marginLeft: 24,
                        marginVertical: 8,
                        borderRadius: 8,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: COLORS.black,
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.blue,
                        height: 30,
                        width: 120,
                        marginLeft: 10,
                        marginTop: 16,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: COLORS.white,
                          fontWeight: "600",
                          textAlign: "center",
                          marginTop: 4,
                        }}
                      >
                        Follow
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
    )
}

export default Member;