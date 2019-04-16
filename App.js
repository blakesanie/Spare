import React, { Component } from "react";
import AppStack from "./navigation/DrawerNav";
import { AppLoading, Asset, Font, Icon } from "expo";

export default class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      normal: require("./assets/fonts/Rubik-Medium.ttf"),
      bold: require("./assets/fonts/Rubik-Bold.ttf"),
      light: require("./assets/fonts/Rubik-Light.ttf")
    });
    this.setState({
      fontLoaded: true
    });
  }

  render() {
    if (this.state.fontLoaded) {
      return <AppStack />;
    }
    return null;
  }
}
