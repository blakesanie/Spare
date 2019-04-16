import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  SafeAreaView,
  Dimensions
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10
  }
});

export default class EditButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <AntDesign name="edit" color="white" size={28} />
      </TouchableOpacity>
    );
  }
}
