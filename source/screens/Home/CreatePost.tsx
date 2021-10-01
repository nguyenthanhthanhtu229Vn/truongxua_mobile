/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {Text, View,Image,Animated,TextInput,Modal,Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const CreatePost: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flex: 1,position:"relative"}}>
                <Modal
              style={{backgroundColor:"black",opacity:0.5}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View  style={{backgroundColor:"black",opacity:0.5,position:"absolute",width:width,height:height}}></View>
        </Modal>
              {/* popup */}
              <Modal
              style={{backgroundColor:"black",opacity:0.5}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
            <View style={{zIndex:10,backgroundColor:"white",justifyContent:"center",marginLeft:10,marginRight:10,padding:10,borderRadius:10,marginTop:50}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{fontSize:20,fontWeight:"700",marginBottom:10}}>Create New Post</Text>
                <TouchableOpacity>
                <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
                <Image style={{width:20,height:20}} source={require("../../assets/icons/error.png")}></Image>
                </Pressable>
                </TouchableOpacity>
             </View>
            <View>
            <TextInput style={{borderRadius: 10 ,borderColor:"#d0d0d0",borderWidth:1,backgroundColor:"#f5f4f9",padding:10,height:100}} scrollEnabled multiline placeholder="Write something"></TextInput>
            </View>
            <View style={{flexDirection:"row",margin:20}}>
                <Image style={{width:25,height:25}} source={require("../../assets/icons/imageGallery.png")}></Image>
                <Image style={{width:25,height:25,marginLeft:20}} source={require("../../assets/icons/feedback.png")}></Image>
                <Image style={{width:25,height:25,marginLeft:20}} source={require("../../assets/icons/menu.png")}></Image>
            </View>
       <TouchableOpacity>
           <View style={{backgroundColor:"#088dcd",width:"100%",padding:10,borderRadius:20}}>
               <Text  style={{color:"white",fontSize:20,fontWeight:"700",textAlign:"center"}}>Publish</Text>
           </View>
       </TouchableOpacity>
        </View>
</Modal>
   {/* ==================================== */}

       <View style={{zIndex:1,borderRadius:10,borderColor:"#d0d0d0",borderWidth:1,backgroundColor:"#fafafa",padding:10,margin:5}}>
        <Text style={{fontSize:20,fontWeight:"700",marginBottom:10}}>Create New Post</Text>
        <TouchableOpacity>
        <Pressable
        onPress={() => setModalVisible(true)}
      >
          <View style={{ borderRadius: 250 ,borderColor:"#d0d0d0",borderWidth:1,backgroundColor:"#fff",padding:10,flexDirection:"row"}}>
            <Image style={{width:15,height:15,alignItems:"center",marginTop:3,marginLeft:5}} 
            source={require("../../assets/icons/pencil.png")}></Image>
            <Text style={{fontSize:15,color:"#808080",marginLeft:10}}>Create New Post</Text>
          </View>
          </Pressable>
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginTop:20}}>
        <View style={{flexDirection:'row',marginLeft:10}}>
        <Image style={{width:25,height:25}} 
            source={require("../../assets/icons/imageGallery.png")}></Image>
            <Text style={{fontSize:15,fontWeight:"500",marginBottom:10,marginLeft:10}}>Photo/Video</Text>
        </View>
        <View style={{flexDirection:'row', marginLeft:15}}>
        <Image style={{width:25,height:25}} 
            source={require("../../assets/icons/feedback.png")}></Image>
            <Text style={{fontSize:15,fontWeight:"500",marginBottom:10,marginLeft:10}}>Feeling/Activity</Text>
        </View>
        </View>
      </View>
 </View> 
  );
};
export default CreatePost;
// import React, { useState } from "react";
// import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
        
//           <View style={styles.modalView}>
//             <Text style={{fontSize:20,fontWeight:"700",marginBottom:10}}>Create New Post</Text>
//         <TouchableOpacity>
//           <View style={{ borderRadius: 250 ,borderColor:"#d0d0d0",borderWidth:1,backgroundColor:"#fff",padding:10,flexDirection:"row"}}>
//             <Image style={{width:15,height:15,alignItems:"center",marginTop:3,marginLeft:5}} 
//             source={{uri: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"}}></Image>
//             <Text style={{fontSize:15,color:"#808080",marginLeft:10}}>Create New Post</Text>
//           </View>
//         </TouchableOpacity>
//         <View style={{flexDirection:'row',marginTop:20}}>
//         <View style={{flexDirection:'row',marginLeft:10}}>
//         <Image style={{width:25,height:25}} 
//             source={{uri: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"}}></Image>
//             <Text style={{fontSize:15,fontWeight:"500",marginBottom:10,marginLeft:10}}>Photo/Video</Text>
//         </View>
//         <View style={{flexDirection:'row', marginLeft:15}}>
//         <Image style={{width:25,height:25}} 
//             source={{uri: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"}}></Image>
//             <Text style={{fontSize:15,fontWeight:"500",marginBottom:10,marginLeft:10}}>Feeling/Activity</Text>
//         </View>
//       </View>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
      
//         <Text style={{fontSize:20,fontWeight:"700",marginBottom:10}}>Create New Post</Text>
//         <TouchableOpacity>
//           <View style={{ borderRadius: 250 ,borderColor:"#d0d0d0",borderWidth:1,backgroundColor:"#fff",padding:10,flexDirection:"row"}}>
//             <Image style={{width:15,height:15,alignItems:"center",marginTop:3,marginLeft:5}} 
//             source={{uri: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"}}></Image>
//             <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//             <Text style={{fontSize:15,color:"#808080",marginLeft:10}}>Create New Post</Text>
//              </Pressable>
//           </View>
//         </TouchableOpacity>
//         <View style={{flexDirection:'row',marginTop:20}}>
//         <View style={{flexDirection:'row',marginLeft:10}}>
//         <Image style={{width:25,height:25}} 
//             source={{uri: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"}}></Image>
//             <Text style={{fontSize:15,fontWeight:"500",marginBottom:10,marginLeft:10}}>Photo/Video</Text>
//         </View>
//         <View style={{flexDirection:'row', marginLeft:15}}>
//         <Image style={{width:25,height:25}} 
//             source={{uri: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"}}></Image>
//             <Text style={{fontSize:15,fontWeight:"500",marginBottom:10,marginLeft:10}}>Feeling/Activity</Text>
//         </View>
//       </View>
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });

// export default App;
