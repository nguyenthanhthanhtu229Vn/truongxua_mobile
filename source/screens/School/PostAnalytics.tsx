import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constant";

const PostAnalysis = () => {
  return (
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
          Phân Tích Bài Đăng
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Bài Đọc</Text>
        <TouchableOpacity
          style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.5 }}
        >
          <Text
            style={{
              color: COLORS.blue,
              fontSize: 16,
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            10
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Đề Xuất</Text>
        <TouchableOpacity
          style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.5 }}
        >
          <Text
            style={{
              color: COLORS.blue,
              fontSize: 16,
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            10
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Chia Sẻ</Text>
        <TouchableOpacity
          style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.5 }}
        >
          <Text
            style={{
              color: COLORS.blue,
              fontSize: 16,
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            10
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>
          Người Tham Chiếu
        </Text>
        <TouchableOpacity
          style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.5 }}
        >
          <Text
            style={{
              color: COLORS.blue,
              fontSize: 16,
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            10
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostAnalysis;
