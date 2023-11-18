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
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Animated
} from "react-native";
import ActionButton from "../components/ActionButton";
import SegmentedControl from "../components/SegmentedControl";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants";
import BackButton from "../components/BackButton";
const db = require("../db.js");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 30,
    width: 300,
    // alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    fontFamily: "light",
    marginBottom: 20,
    marginTop: 10,
    width: "100%",
    textAlign: "center"
  },
  textInput: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    width: "100%",
    fontSize: 22,
    fontFamily: "light"
  },
  actionButton: {
    //alignSelf: "center",
    marginTop: 30,
    zIndex: 0
  },
  info: {
    position: "absolute",
    top: 10,
    right: 10
  },
  back: {
    position: "absolute",
    top: 10,
    left: 10
  },
  cancelButton: {
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: colors.green,
    marginRight: 20
  },
  remove: {
    color: "red",
    fontFamily: "light",
    marginTop: 26,
    fontSize: 18,
    textAlign: "center"
  },
  segmentedControl: {},
  infoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  word: {
    fontSize: 26,
    fontFamily: "light"
  },
  definition: {
    fontSize: 18,
    fontFamily: "light",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  caption: {
    fontSize: 20,
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "light"
  }
});

export default class EditSaving extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {};
  // };

  state = {
    infoOpacity: new Animated.Value(0),
    infoTouch: false,
    segmentedIndex:
      this.props.navigation.getParam("index") == -1
        ? 0
        : ["Income", "Sacrifice"].indexOf(
            this.props.navigation.getParam("data").items[
              this.props.navigation.getParam("wantIndex")
            ].savings[this.props.navigation.getParam("index")].type
          ),
    amountText:
      this.props.navigation.getParam("index") == -1
        ? ""
        : this.props.navigation.getParam("data").items[
            this.props.navigation.getParam("wantIndex")
          ].savings[this.props.navigation.getParam("index")].amount + "",
    titleText:
      this.props.navigation.getParam("index") == -1
        ? ""
        : this.props.navigation.getParam("data").items[
            this.props.navigation.getParam("wantIndex")
          ].savings[this.props.navigation.getParam("index")].title + ""
  };

  async submit() {
    var navigation = this.props.navigation;
    var wantIndex = navigation.getParam("wantIndex");
    var index = navigation.getParam("index");
    var current = navigation.getParam("data");
    var initialAmount =
      index == -1 ? 0 : current.items[wantIndex].savings[index].amount;
    //console.log(initialAmount);
    var newSaving = {
      title:
        this.state.titleText || current.items[wantIndex].savings[index].title,
      amount: parseInt(this.state.amountText) || initialAmount,
      type: ["Income", "Sacrifice"][this.state.segmentedIndex]
    };
    if (index == -1) {
      var now = new Date();
      newSaving.time = now.getTime();
      newSaving.month = now.getMonth() + 1;
      newSaving.day = now.getDate();
      current.items[wantIndex].savings.unshift(newSaving);
    } else {
      var currentSaving = current.items[wantIndex].savings[index];
      newSaving.time = currentSaving.time;
      newSaving.month = currentSaving.month;
      newSaving.day = currentSaving.day;
      current.items[wantIndex].savings[index] = newSaving;
    }
    var changeInAmount = newSaving.amount - initialAmount;
    current.items[wantIndex].saved += changeInAmount;
    current.totalSaved += changeInAmount;
    await db.ref("/").transaction(snapshot => {
      snapshot.totalSaved += changeInAmount;
      return snapshot;
    });
    await AsyncStorage.setItem("data", JSON.stringify(current));
    const exit = navigation.getParam("exit");
    exit(current);
    this.props.navigation.goBack();
  }

  async removeSaving() {
    var navigation = this.props.navigation;
    var wantIndex = navigation.getParam("wantIndex");
    var index = navigation.getParam("index");
    var current = navigation.getParam("data");
    var saving = current.items[wantIndex].savings[index];
    var amount = saving.amount;
    current.totalSaved -= amount;
    current.items[wantIndex].saved -= amount;
    current.items[wantIndex].savings = current.items[wantIndex].savings.filter(
      (val, i) => {
        return i != index;
      }
    );
    await AsyncStorage.setItem("data", JSON.stringify(current));
    const exit = navigation.getParam("exit");
    exit(current);
    this.props.navigation.goBack();
  }

  async toggleInfo() {
    await this.setState({
      infoTouch: !this.state.infoTouch
    });
    Animated.timing(this.state.infoOpacity, {
      toValue: 1 - this.state.infoOpacity._value,
      duration: 200
    }).start();
  }

  render() {
    var navigation = this.props.navigation;
    var wantIndex = navigation.getParam("wantIndex");
    var savings = navigation.getParam("data").items[wantIndex].savings;
    var index = navigation.getParam("index");
    var removeComponent =
      index == -1 ? null : (
        <TouchableOpacity
          onPress={() => {
            this.removeSaving();
          }}
        >
          <Text style={styles.remove}>Remove Item</Text>
        </TouchableOpacity>
      );
    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled={true}
          >
            <View style={styles.content}>
              <Text style={styles.title}>
                {(index == -1 ? "New" : "Edit") + " Saving"}
              </Text>
              <SegmentedControl
                selectedIndex={this.state.segmentedIndex}
                style={styles.segmentedControl}
                incomePressed={() => {
                  console.log("in");
                  this.setState({
                    segmentedIndex: 0
                  });
                }}
                sacrificePressed={() => {
                  console.log("sac");
                  this.setState({
                    segmentedIndex: 1
                  });
                }}
              />
              <Text style={styles.caption}>Title:</Text>
              <TextInput
                maxLength={10}
                clearButtonMode="always"
                placeholder={
                  this.state.segmentedIndex == 0 ? "PayCheck" : "Morning Coffee"
                }
                style={styles.textInput}
                onChangeText={text => this.setState({ titleText: text })}
                editable={true}
                value={this.state.titleText}
              />
              <Text style={styles.caption}>Amount ($):</Text>
              <TextInput
                clearButtonMode="always"
                placeholder="12"
                style={styles.textInput}
                onChangeText={text => {
                  console.log(text);
                  this.setState({ amountText: text });
                }}
                keyboardType="numeric"
                onEndEditing={() => {
                  console.log("done editing");
                }}
                value={this.state.amountText}
              />
              <ActionButton
                style={[styles.actionButton, styles.cancelButton]}
                text="Cancel"
                textColor="black"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
              <ActionButton
                style={[styles.actionButton]}
                text="Submit"
                onPress={() => {
                  this.submit();
                }}
              />
              {removeComponent}
              <Animated.View
                style={[
                  styles.infoContainer,
                  { opacity: this.state.infoOpacity }
                ]}
                pointerEvents={this.state.infoTouch == true ? "all" : "none"}
              >
                <Text style={styles.word}>Income:</Text>
                <Text style={styles.definition}>
                  Any new addition to your total monetary wealth.
                </Text>
                <Text style={styles.word}>Sacrifice:</Text>
                <Text style={styles.definition}>
                  Any money saved by not spending on a certain good.
                </Text>
              </Animated.View>
              <TouchableOpacity
                style={styles.info}
                onPress={() => {
                  this.toggleInfo();
                }}
              >
                <Feather name="info" size={28} color="#ccc" />
              </TouchableOpacity>
              <BackButton
                navigation={this.props.navigation}
                color={colors.green}
                style={styles.back}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
