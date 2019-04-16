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
const db = require("../db.js");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  question: {
    fontSize: 32,
    color: "white",
    padding: 20,
    fontFamily: "light"
  },
  response: {
    fontSize: 21,
    color: "white",
    padding: 20,
    textAlign: "center",
    fontFamily: "light"
  },
  totalSavings: {
    backgroundColor: "white",
    color: "black",
    fontSize: 30,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 16,
    overflow: "hidden",
    fontFamily: "light"
  }
});

export default class HomeScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {};
  // };

  componentDidMount() {
    var ref = db.ref("/");
    ref.on(
      "value",
      function(snapshot) {
        this.setState({
          totalSaved: "$" + snapshot.val().totalSaved
        });
      }.bind(this)
    );
  }

  state = {
    totalSaved: "-"
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.question}>What is Spare?</Text>
        <Text style={styles.response}>
          Spare is a free savings managment app developed by Blake Sanie for iOS
          and Android.
        </Text>
        <Text style={styles.response}>So far, Spare has been used to save</Text>
        <Text style={styles.totalSavings}>{this.state.totalSaved}</Text>
        <Text style={styles.response}>across all its users.</Text>
        <View />
      </SafeAreaView>
    );
  }
}
