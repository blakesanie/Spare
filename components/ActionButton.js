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
  WebView,
  Dimensions,
  SafeAreaView
} from "react-native";
import { colors } from "../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    alignSelf: "flex-start",

    zIndex: 10
  },
  text: {
    //color: "white",
    fontSize: 17,
    fontFamily: "light"
  }
});

export default class ActionButton extends React.Component {
  state = {};

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.text, { color: this.props.textColor || "white" }]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
