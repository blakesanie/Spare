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
import { colors } from "../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10
  },
  half: {
    padding: 20,
    paddingTop: 7,
    paddingBottom: 7
  },
  text: {
    fontSize: 16,
    fontFamily: "light"
  },
  selected: {
    backgroundColor: colors.green,
    color: "white"
  }
});

export default class EditButton extends React.Component {
  render() {
    var selectionStyles = [styles.selected, null];
    var selectedIndex = this.props.selectedIndex;
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style={[styles.half, selectionStyles[selectedIndex]]}
          onPress={this.props.incomePressed}
        >
          <Text style={[styles.text, selectionStyles[selectedIndex]]}>
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.half, selectionStyles[1 - selectedIndex]]}
          onPress={this.props.sacrificePressed}
        >
          <Text style={[styles.text, selectionStyles[1 - selectedIndex]]}>
            Sacrifice
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
