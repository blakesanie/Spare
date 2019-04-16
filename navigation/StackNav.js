import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "../screens/Home";
import ItemView from "../screens/ItemView";
import EditWant from "../screens/EditWant";
import EditButton from "../components/EditButton";
import XButton from "../components/XButton";
import DrawerButton from "../components/DrawerButton";
import BackButton from "../components/BackButton";
import { Font } from "expo";
import { colors } from "../constants";

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "My Wants",
        headerLeft: <DrawerButton navigation={navigation} />,
        headerTitleStyle: {
          fontFamily: "light"
        },
        headerBackTitle: " ", //just back arrow
        headerStyle: {
          backgroundColor: colors.green,
          shadowColor: "transparent",
          borderBottomWidth: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0
          }
        },
        headerTintColor: "white"
      })
    },
    ItemView: {
      screen: ItemView,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <BackButton navigation={navigation} color="white" />,
        headerTitleStyle: {
          fontFamily: "light"
        },
        headerStyle: {
          backgroundColor: colors.green,
          shadowColor: "transparent",
          borderBottomWidth: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0
          }
        },
        headerTintColor: "white"
      })
    },
    EditWant: {
      screen: EditWant,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <BackButton navigation={navigation} color="white" />,
        headerTitleStyle: {
          fontFamily: "light"
        },
        headerStyle: {
          backgroundColor: colors.green,
          shadowColor: "transparent",
          borderBottomWidth: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0
          }
        },
        headerTintColor: "white"
      })
    }
  },
  {}
);
