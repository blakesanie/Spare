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
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 50
  }
});

export default class EditButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Ionicons name="ios-arrow-back" color={this.props.color} size={28} />
      </TouchableOpacity>
    );
  }
}
