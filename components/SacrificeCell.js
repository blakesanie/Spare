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

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 48,
    marginBottom: 24,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  price: {
    fontSize: 32,
    fontFamily: "light"
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  textCont: {
    marginRight: 0
  },
  title: {
    fontSize: 26,
    fontFamily: "light",
    width: "100%",
    marginBottom: 5
  },
  saved: {
    backgroundColor: "#0D9A46",
    textAlign: "center",
    padding: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    color: "white",
    fontSize: 30,
    borderRadius: 12,
    overflow: "hidden",
    fontFamily: "light"
  },
  type: {
    fontSize: 18,
    color: "#aaa",
    fontFamily: "light",
    marginRight: 20
  },
  icon: {}
});

export default class ThumbNail extends React.Component {
  state = {};

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.infoBox}>
          <View style={styles.textCont}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.type}>
              {this.props.type +
                ", " +
                ++this.props.month +
                "/" +
                this.props.day}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.icon}
            onPress={this.props.editOnPress}
          >
            <AntDesign name="edit" color="#aaa" size={28} />
          </TouchableOpacity>
        </View>
        <Text style={styles.saved}>{"$" + this.props.amount}</Text>
      </View>
    );
  }
}
