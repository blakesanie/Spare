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
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get("window").width - 72) / 2,
    aspectRatio: 1,
    backgroundColor: "white",
    marginLeft: 24,
    marginBottom: 24,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 10,
    justifyContent: "space-between"
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10
  },
  price: {
    fontSize: 32,
    fontFamily: "light"
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "light"
  },
  saved: {
    textAlign: "center",
    padding: 5,
    borderRadius: 8,
    overflow: "hidden",
    fontFamily: "light",
    fontSize: 16
  }
});

export default class ThumbNail extends React.Component {
  state = {};

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={styles.price}>{"$" + this.props.price}</Text>
        <AntDesign
          style={styles.icon}
          name={this.props.icon}
          color={colors.green}
          size={28}
        />
        <Text style={styles.title}>{this.props.text}</Text>
        <Text style={styles.saved}>{"$" + this.props.saved + " saved"}</Text>
      </TouchableOpacity>
    );
  }
}
