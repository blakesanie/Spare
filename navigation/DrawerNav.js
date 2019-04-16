import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import ModalNav from "./ModalNav";
import StackNav from "./StackNav";
import Drawer from "../screens/Drawer";

const DrawerNav = createDrawerNavigator(
  {
    ModalNav: ModalNav
    // StackNav: StackNav
  },
  {
    contentComponent: Drawer,
    drawerWidth: 300,
    drawerLockMode: "locked-closed",
    navigationOptions: {}
  }
);

const App = createAppContainer(DrawerNav);
export default App;
