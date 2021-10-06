import {
  FlatList,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import React, { Component } from "react";

const carouselItems = [
  {
    id: 1,
    eventImg: require("../../assets/images/event.jpg"),
    name: "Toronto Wedding Party Event 2020",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: 2,
    eventImg: require("../../assets/images/event3.jpg"),
    name: "Music Concert Lady Gaga 2020",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: 3,
    eventImg: require("../../assets/images/event2.jpg"),
    name: "Get Together Of Oddo Inc Abu Dhabi",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: 4,
    eventImg: require("../../assets/images/event4.jpg"),
    name: "Starting With EM Club",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: 5,
    eventImg: require("../../assets/images/event5.jpg"),
    name: "My Friend Wedding Party",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
];

const MyCarousel: React.FC = () => {
  return (
    //  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
    <View style={{ height: SIZES.height / 3 }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        // numColumns={carouselItems.length}
        //   horizontal
        //   showsVerticalScrollIndicator={false}
        //   showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          flexDirection: "row",
        }}
        data={carouselItems}
        renderItem={({ item, index }) => {
          return (
            <View style={{ position: "relative" }}>
              <ImageBackground
                style={{
                  width: SIZES.width,
                  height: SIZES.height / 3,
                  resizeMode: "stretch",
                  borderRadius: 10,
                }}
                source={item.eventImg}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 20,
                  paddingLeft: 20,
                  width: SIZES.width - 40,
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ color: "white", ...FONTS.h2, fontWeight: "500" }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ color: "white", ...FONTS.h3, fontWeight: "500" }}
                >
                  {item.content}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
    //  </ScrollView>
  );
};

// 	render() {
// 		return (
// 			 <View style={{flex: 1}}>
//             <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
//               {this._renderItem}
//             <Text style={{position: 'absolute',backgroundColor:"#17a2b8", fontSize:28, color:"white",
// bottom:-20,right:20,paddingLeft:10,paddingRight:10,borderRadius:100,width:40,height:40,
// textAlign: 'center'
//         }}>+</Text>
//             </View>
//           </View>

// 		)
// 	}
// }

const styles = StyleSheet.create({
  items: {
    width: SIZES.width,
    height: SIZES.height / 3,
    position: "relative",
  },
});
export default MyCarousel;
