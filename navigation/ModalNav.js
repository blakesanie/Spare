import React from "react";
import { createStackNavigator } from "react-navigation";
import StackNav from "./StackNav";
import EditSaving from "../screens/EditSaving";
import { Animated, Easing, Platform } from "react-native";
function forVertical(props) {
  const { layout, position, scene } = props;

  const index = scene.index;
  const height = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]: Array<number>),
    outputRange: ([height, 0, 0]: Array<number>)
  });

  return {
    transform: [{ translateX }, { translateY }]
  };
}

export default createStackNavigator(
  {
    StackNav: {
      screen: StackNav
    },
    EditSaving: {
      screen: EditSaving
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    cardStyle: {
      backgroundColor: "rgba(255,255,255,0.95)"
      // opacity: 1
    },
    transitionConfig: () => {
      return {
        transitionSpec: {
          duration: 400,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true
        },
        screenInterpolator: ({ position, scene }) => {
          const { index } = scene;

          const opacity = position.interpolate({
            inputRange: [index - 1, index],
            outputRange: [0, 1]
          });

          return { opacity };
        }
      };
    }
  }
);
