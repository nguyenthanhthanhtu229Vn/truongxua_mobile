import React from "react";
import { View,Text,Image, Dimensions, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant";
const {width} = Dimensions.get('window').width;
const {height} = Dimensions.get('window').height;
import { StyleSheet } from "react-native";
const BlogDetail = () => {
    return (
        <SafeAreaView>
            <ScrollView>
            <View style={{flex: 1}}>
            <View >
                <Image source={require('../../assets/images/avatar.jpeg')} style={{width: width, height: 250}} />
            </View>

            <View style={{backgroundColor: COLORS.white,height: height}}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-around', borderTopRightRadius:20,borderTopLeftRadius: 20}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginVertical: 12}}>
                        <Image source={require('../../assets/images/avatar.jpeg')} style={{height:60, width: 60,borderRadius:SIZES.base,marginLeft: -24}} />
                        <Text style={style.text}>Post By <Text style={{color:'#F62B53'}}>Name</Text></Text>
                    </View>
                    <Text>11 June, 2020</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
                  <TouchableOpacity style={style.btn}>
                    <Image source= {icons.like} style={style.icon}></Image>
                    <Text style={style.text}>Like </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={style.btn}>
                    <Image source= {icons.comment} style={style.icon}></Image>
                    <Text style={style.text}>Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.btn}>
                    <Image source= {icons.share} style={style.icon}></Image>
                    <Text style={style.text}>Share</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{...FONTS.h2,color: COLORS.black, fontWeight:'300', marginTop: 10, marginLeft:14}}>How To Make More Travel By Doing dsdsdsds </Text>
                <Text style={{...FONTS.h3,  marginLeft:14, marginTop: 10,color:COLORS.gray}}>“Giami” is a social community mobile app kit with features. user can use this app for sharing blog, posts, timeline, create Group, Create Pages, chat/Messages, Movies sharing, QA, and Much More. This template for developers who want to kickstart their next social </Text>
                <View style={{flexDirection: 'row', marginHorizontal: 14, marginTop:14}}>
                <Image source={require('../../assets/images/avatar.jpeg')} style={{height:150, width: 170,borderRadius:SIZES.base}} />
                <Image source={require('../../assets/images/avatar.jpeg')} style={{height:150, width: 170,borderRadius:SIZES.base,marginLeft:14}} />
                </View>
                <Text style={{...FONTS.h3,  marginLeft:14, marginTop: 10,color:COLORS.gray}}>“Giami” is a social community mobile app kit with features. user can use this app for sharing blog, posts, timeline, create Group, Create Pages, chat/Messages, Movies sharing, QA, and Much More. This template for developers who want to kickstart their next social </Text>

            </View>
    </View>
            </ScrollView>
        </SafeAreaView>
       
    )
};
const style = StyleSheet.create({
    btn:{
      width: 100,
      height: 30,
      backgroundColor: '#eeecec', 
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 6,
      shadowOpacity: 0.2,
    },
    icon:{
      height: 14, 
      width: 14,
      marginLeft: 8,
    },
    iconf:{
      height: 20,
      width: 20,
    },
    text:{
      ...FONTS.h4,
      fontWeight: '500',
      marginLeft: 10,
  
    }
  })
export default BlogDetail;