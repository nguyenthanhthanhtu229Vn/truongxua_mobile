// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   SafeAreaView,
// // //   FlatList,
// // //   ActivityIndicator,
// // // } from "react-native";
// // // import { StyleSheet } from "react-native";
// // // const movieURL = "https://reactnative.dev/movies.json";
// // // const TestApi = () => {
// // //   const [isLoading, setLoading] = useState(true);
// // //   const [data, setData] = useState([]);
// // //   const [title, setTitle] = useState([]);
// // //   const [des, setDes] = useState([]);
// // //   useEffect(() => {
// // //     fetch(movieURL)
// // //       .then((response) => response.json())
// // //       .then((json) => {
// // //         setData(json.movies);
// // //         setTitle(json.title);
// // //         setDes(json.description)



// // //       })
// // //       .catch((error) => alert(error))
// // //       .finally(() => setLoading(false));
// // //   });

// // //   return (
// // //     <SafeAreaView style={styles.container}
// // //     >
// // //       {isLoading ? (
// // //         <ActivityIndicator />
// // //       ) : (
// // //         <View>
// // //           <Text>{title}</Text>
// // //           <FlatList
// // //             data={data}
// // //             keyExtractor={({ id }, index) => id}
// // //             renderItem={({ item }) => {
// // //               return (
// // //                 <Text>
// // //                   {item.title} {item.releaseYear}
// // //                 </Text>
// // //               );
// // //             }}
// // //           />
// // //           <Text>{des}</Text>
// // //         </View>
// // //       )}
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         alignItems: 'center', 
// // //         justifyContent: "center" 
// // //     }
// // // })
// // // export default TestApi;
// // import axios from "axios";
// // import React, { useState, useEffect } from "react";
// // import {
// //   StyleSheet,
// //   Text,
// //   ScrollView,
// //   View,
// //   Button,
// //   Image,
// //   Platform,
// // } from "react-native";
// // import Constants from "expo-constants";
// // const baseUrl = "https://reqres.in";
// // function User({ userObject }: {userObject: any}) {
// //   return (
// //     <View>
// //       <Image
// //         source={{ uri: userObject.avatar }}
// //         style={{ width: 128, height: 128, borderRadius: 64 }}
// //       />
// //       <Text style={{ textAlign: "center", color: "white" }}>
// //         {`${userObject.first_name} ${userObject.last_name}`}
// //       </Text>
// //       <Text style={{ textAlign: "center", color: "white" }}>
// //         {`${userObject.email} ${userObject.last_name}`}
// //       </Text>
// //     </View>
// //   );
// // }
// // export default function TestApi() {
// //   const [userId, setUserId] = useState(1);
// //   const [user, setUser] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [hasError, setErrorFlag] = useState(false);
// //   const changeUserIdHandler = () => {
// //     setUserId((userId) => (userId === 3 ? 1 : userId + 1));
// //   };
// //   useEffect(() => {
// //     const source = axios.CancelToken.source();
// //     const url = `${baseUrl}/api/users/${userId}`;
// //     const fetchUsers = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await axios.get(url, { cancelToken: source.token });
// //         if (response.status === 200) {
// //           setUser(response.data.data);
// //           setIsLoading(false);
// //           return;
// //         } else {
// //           throw new Error("Failed to fetch users");
// //         }
// //       } catch (error) {
// //         if(axios.isCancel(error)){
// //           console.log('Data fetching cancelled');
// //         }else{
// //           setErrorFlag(true);
// //           setIsLoading(false);
// //         }
// //       }
// //     };
// //     fetchUsers();
// //     return () => source.cancel("Data fetching cancelled");
// //   }, [userId]);
// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <View style={styles.wrapperStyle}>
// //         {!isLoading && !hasError && user && <User userObject={user} />}
// //       </View>
// //       <View style={styles.wrapperStyle}>
// //         {isLoading && <Text> Loading </Text>}
// //         {!isLoading && hasError && <Text> An error has occurred </Text>}
// //       </View>
// //       <View>
// //         <Button
// //           title="Load user"
// //           onPress={changeUserIdHandler}
// //           disabled={isLoading}
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // }
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "dodgerblue",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
// //   },
// //   wrapperStyle: {
// //     minHeight: 128,
// //   },
// //   buttonStyles: {
// //     padding: 100,
// //   },
// // });
// import axios from "axios";
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   ScrollView,
//   View,
//   Button,
//   Platform,
//   TextInput,
// } from "react-native";
// import Constants from "expo-constants";

// const baseUrl = "https://reqres.in";

// export default function TestApi() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const onChangeNameHandler = (fullName) => {
//     setFullName(fullName);
//   };

//   const onChangeEmailHandler = (email) => {
//     setEmail(email);
//   };

//   const onSubmitFormHandler = async (event) => {
//     if (!fullName.trim() || !email.trim()) {
//       alert("Name or Email is invalid");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${baseUrl}/api/users`, {
//         fullName,
//         email,
//       });
//       if (response.status === 201) {
//         alert(` You have created: ${JSON.stringify(response.data)}`);
//         setIsLoading(false);
//         setFullName('');
//         setEmail('');
//       } else {
//         throw new Error("An error has occurred");
//       }
//     } catch (error) {
//       alert("An error has occurred");
//       setIsLoading(false);
//     }
//   };

//   const onSubmitFormHandler = (event) => {
//     if (!fullName.trim() || !email.trim()) {
//       alert("Name or Email is invalid");
//       return;
//     }
//     setIsLoading(true);

//     const configurationObject = {
//       url: `${baseUrl}/api/users/2`,
//       method: "PUT",
//       data: { fullName, email },
//     };

//     axios(configurationObject)
//       .then((response) => {
//         if (response.status === 200) {
//           alert(` You have updated: ${JSON.stringify(response.data)}`);
//           setIsLoading(false);
//           setFullName("");
//           setEmail("");
//         } else {
//           throw new Error("An error has occurred");
//         }
//       })
//       .catch((error) => {
//         alert("An error has occurred");
//         setIsLoading(false);
//       });
//   };
//   // const onSubmitFormHandler = async (event) => {
//   //   if (!fullName.trim() || !email.trim()) {
//   //     alert("Name or Email is invalid");
//   //     return;
//   //   }
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await axios.delete(`${baseUrl}/api/users/2`, {
//   //       fullName,
//   //       email,
//   //     });
//   //     if (response.status === 204) {
//   //       alert(` You have deleted: ${JSON.stringify(response.data)}`);
//   //       setIsLoading(false);
//   //       setFullName('');
//   //       setEmail('');
//   //     } else {
//   //       throw new Error("Failed to delete resource");
//   //     }
//   //   } catch (error) {
//   //     alert("Failed to delete resource");
//   //     setIsLoading(false);
//   //   }
//   // }; 
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View>
//         <View style={styles.wrapper}>
//           {isLoading ? (
//             <Text style={styles.formHeading}> Creating resource </Text>
//           ) : (
//             <Text style={styles.formHeading}>Create new user</Text>
//           )}
//         </View>
//         <View style={styles.wrapper}>
//           <TextInput
//             placeholder="Full Name"
//             placeholderTextColor="#ffffff"
//             style={styles.input}
//             value={fullName}
//             editable={!isLoading}
//             onChangeText={onChangeNameHandler}
//           />
//         </View>
//         <View style={styles.wrapper}>
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#ffffff"
//             style={styles.input}
//             value={email}
//             editable={!isLoading}
//             onChangeText={onChangeEmailHandler}
//           />
//         </View>
//         <View>
//           <Button
//             title="Submit"
//             onPress={onSubmitFormHandler}
//             style={styles.submitButton}
//             // disabled={isLoading}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#252526",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
//   },
//   formHeading: {
//     color: "#ffffff",
//   },
//   wrapper: {
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: "grey",
//     minWidth: 200,
//     textAlignVertical: "center",
//     paddingLeft: 10,
//     borderRadius: 20,
//     color: "#ffffff",
//   },
//   submitButton: {
//     backgroundColor: "gray",
//     padding: 100,
//   },
// });

import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { useState,useEffect } from "react";
import { Button,View,Image } from "react-native";
const ImagePost = () => {
    const [image , setImage] = useState(null);
    useEffect (() =>{
        (async () => {
          const {status} = await ImagePicker.requestCameraPermissionsAsync();
          if(status !== 'granted'){
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        })
    },[]);
    const pickImg = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality:1
      });
      console.log(result);
      if(!result.cancelled){
        setImage(result.uri);
      }
    };
    return (
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImg} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
export default ImagePost;