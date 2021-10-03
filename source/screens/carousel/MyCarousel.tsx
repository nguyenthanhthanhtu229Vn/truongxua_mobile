
import {FlatList, Text, View,ImageBackground, TouchableOpacity,ScrollView,SafeAreaView} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constant';
import { StyleSheet } from 'react-native';
import React, { Component } from 'react'
import Carousel,  { ParallaxImage } from 'react-native-snap-carousel'

export class MyCarousel extends Component {
	constructor(props) {
		super(props);
		this.state ={
		activeIndex:0,
          carouselItems: [{
    'id': 1,
    'eventImg': require('../../assets/images/event.jpg'),
    'name': 'Toronto Wedding Party Event 2020',
    'date': '2 days ago',
    content: 'Musical and dance party for bechelors in toronto city have fun',

  },
  {
    'id': 2,
    'eventImg': require('../../assets/images/event3.jpg'),
    'name': 'Music Concert Lady Gaga 2020',
    'date': '2 days ago',
    content: 'Musical and dance party for bechelors in toronto city have fun',

  },
  {
    'id': 3,
    'eventImg': require('../../assets/images/event2.jpg'),
    'name': 'Get Together Of Oddo Inc Abu Dhabi',
    'date': '2 days ago',
    content: 'Musical and dance party for bechelors in toronto city have fun',

  },
  {
    'id': 4,
    'eventImg': require('../../assets/images/event4.jpg'),
    'name': 'Starting With EM Club',
    'date': '2 days ago',
    content: 'Musical and dance party for bechelors in toronto city have fun',

  },
  {
    'id': 5,
    'eventImg': require('../../assets/images/event5.jpg'),
    'name': 'My Friend Wedding Party',
    'date': '2 days ago',
    content: 'Musical and dance party for bechelors in toronto city have fun',

  },]
		}
	}
_renderItem({item,index},parallaxProps){
        return (
          <View style={styles.item}>
                <ParallaxImage
                    source={item.eventImg}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{position: 'absolute',bottom:20, paddingLeft:20,width:SIZES.width-40}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{color: 'white', ...FONTS.h2,fontWeight: '500'
            
            }}>
                    { item.name }
                </Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{color: 'white', ...FONTS.h3,fontWeight: '500'
            
            }}>
                    { item.content }
                </Text>
                </View>
            </View>

        )
    }

	render() {
		return (
			 <SafeAreaView style={{flex: 1}}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                loop 
                autoplay
                sliderWidth={SIZES.width}
                sliderHeight={100}
                itemWidth={SIZES.width}
                data={this.state.carouselItems}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
            <Text style={{position: 'absolute',backgroundColor:"#17a2b8", fontSize:28, color:"white",
bottom:-20,right:20,paddingLeft:10,paddingRight:10,borderRadius:100,width:40,height:40,
textAlign: 'center'
        }}>+</Text>
            </View>
          </SafeAreaView>

		)
	}
}
const styles = StyleSheet.create({
  item: {
    width: SIZES.width,
    height: SIZES.height/3,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    zIndex:10
  },
})
export default MyCarousel;