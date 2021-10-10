import React from "react";
import { Text, View } from "react-native";
export interface IErrorText {
  error: string;
}

const Error: React.FunctionComponent<IErrorText> = (props) => {
  const { error } = props;
  if (error === "") return null;
  return (
    <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
      <Text style={{ fontSize: 18, color: "red", fontFamily: "Roboto" }}>
        {error}
      </Text>
    </View>
  );
};

export default Error;
