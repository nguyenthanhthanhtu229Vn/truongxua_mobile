import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity ,ScrollView,SafeAreaView, SectionList,ImageBackground} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
import { StyleSheet } from "react-native";
import MyCarousel from "../carousel/MyCarousel";

const EVENTS = [{

  
    id: '11',
    eventImg: require("../../assets/images/party1.jpg"),
    name: "Toronto Wedding Party Event 2020",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: '22',
    eventImg: require("../../assets/images/party2.jpg"),
    name: "Music Concert Lady Gaga 2020",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: '33',
    eventImg: require("../../assets/images/party3.jpg"),
    name: "Get Together Of Oddo Inc Abu Dhabi",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: '44',
    eventImg: require("../../assets/images/party4.jpg"),
    name: "Starting With EM Club",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
  {
    id: '55',
    eventImg: require("../../assets/images/party1.jpg"),
    name: "My Friend Wedding fun Party",
    date: "2 days ago",
    content: "Musical and dance party for bechelors in toronto city have fun",
  },
]


const Event: React.FC = ({ navigation },props) => {
  const {banner} = props;
  return ( 
  
    <View>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <MyCarousel />
      <View style={style.container}>
       
        <FlatList
           contentContainerStyle={{
        flexDirection: 'column',
  
    }}
          data={EVENTS}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 20,
                  alignItems: "center",
                }}
                key ={item.id}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EventDetail");
                  }}
                >
                  <Image
                    source={item.eventImg}
                    style={{
                      height: SIZES.height / 5,
                      borderRadius: 5,
                      width: SIZES.width / 3,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 10, width: SIZES.width / 2 }}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: COLORS.black,
                      marginLeft: 4,
                      ...FONTS.h3,
                      fontWeight: "600",
                      fontSize: 19,
                      width: SIZES.width / 2.3,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: COLORS.darkGray,
                      marginLeft: 4,
                      ...FONTS.h3,
                      fontWeight: "500",
                      fontSize: 16,
                      width: SIZES.width / 2.3,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    {item.content}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.darkGray,
                      marginLeft: 4,
                      ...FONTS.h4,
                      fontWeight: "500",
                    }}
                  >
                    {item.date}
                  </Text>

                  {/* ========Note Create New Event======= */}
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <TouchableOpacity onPress={() => navigation.navigate('NewEvent')} >
                    <Text
                      style={{
                        backgroundColor: "#17a2b8",
                        color: COLORS.white,
                        ...FONTS.h3,
                        fontWeight: "700",
                        width: 80,
                        textAlign: "center",
                        borderRadius: 7,
                      }}
                    >
                      Đặt
                    </Text>
                    </TouchableOpacity>
                  </View>
                     {/* ========End Create New Event======= */}
                </View>
              </View>
            );
          }}
        />
       
      </View>
        </ScrollView>
</View>
       
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
});

export default Event;