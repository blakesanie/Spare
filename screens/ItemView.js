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
  Animated
} from "react-native";
import SacrificeCell from "../components/SacrificeCell";
import ActionButton from "../components/ActionButton";
import EditButton from "../components/EditButton";
import { Svg, BlurView } from "expo";
import { colors } from "../constants";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green
  },
  card: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    flexWrap: "wrap",
    width: Dimensions.get("window").width - 48,
    marginLeft: 24,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    zIndex: 999,
    marginTop: 10
  },
  totalPrice: {
    fontSize: 40,
    fontFamily: "light"
  },
  half: {
    width: "40%",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 13
  },
  totalPriceCaption: {
    fontSize: 12,
    fontFamily: "light"
  },
  middleRow: {
    // backgroundColor: "yellow",
    // paddingLeft: 24,
    // paddingRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 120,
    marginBottom: 50,
    // backgroundColor: "yellow",
    width: Dimensions.get("window").width - 88
  },
  sacrificesLabel: {
    fontSize: 24,
    fontFamily: "light"
  },
  actionButton: {},
  scrollView: {
    flex: 1,
    marginTop: -70,
    backgroundColor: "white",
    zIndex: 500
  },
  innerScrollView: {
    alignItems: "center"
  },
  svg: {
    width: "100%",
    aspectRatio: 3
    // backgroundColor: "yellow"
  },
  graphLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "yellow",
    marginTop: 5,
    marginBottom: -10
  },
  graphLabel: {
    fontFamily: "light"
  },
  emptyCont: {
    width: "100%",
    paddingTop: 30,
    alignItems: "center"
  },
  emptyText: {
    fontFamily: "light",
    fontSize: 22,
    color: "#aaa",
    textAlign: "center",
    width: 240,
    marginTop: 20,
    lineHeight: 34
  },
  notEnoughData: {
    fontFamily: "light",
    fontSize: 20,
    color: "#aaa",
    marginTop: 40,
    marginBottom: 40
  }
});

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    var title = navigation.getParam("data").items[navigation.getParam("index")]
      .name;
    return {
      headerRight: <EditButton onPress={navigation.getParam("editWant")} />,
      title: title
    };
  };

  state = {
    blurIntensity: new Animated.Value(0)
  };

  componentDidMount() {
    this.props.navigation.setParams({ editWant: this.editWant.bind(this) });
    // this.didBlurSubscription = this.props.navigation.addListener(
    //   "willBlur",
    //   payload => {
    //     console.log("willblurr");
    //     const exit = this.props.navigation.getParam("exit");
    //     exit(this.props.navigation.getParam("data"));
    //   }
    // );
  }

  // componentWillUnmount() {
  //   console.log("unmount");
  //   this.didBlurSubscription.remove();
  //   // console.log("unmounts");
  //   // const exit = this.props.navigation.getParam("exit");
  //   // exit(this.props.navigation.getParam("data"));
  // }

  editWant() {
    this.props.navigation.navigate("EditWant", {
      data: this.props.navigation.getParam("data"),
      index: this.props.navigation.getParam("index"),
      exit: async data => {
        await this.props.navigation.setParams({
          data: data
        });
        const exit = this.props.navigation.getParam("exit");
        exit(data);
      }
    });
  }

  getDataForGraph(max) {
    var navigation = this.props.navigation;
    var data = navigation.getParam("data");
    var index = navigation.getParam("index");
    var item = data.items[index];
    var max = Math.max(item.saved, item.price);
    var savings = data.items[index].savings;
    var out = {};
    var totalAmount = 0;
    var firstDay = Math.floor(savings[savings.length - 1].time / 86400000);
    for (var i = savings.length - 1; i > -1; i--) {
      var saving = savings[i];
      var daysSinceStart = Math.floor(saving.time / 86400000) - firstDay + 1;
      var amount = (saving.amount + totalAmount) / max;
      totalAmount += saving.amount;
      if (out[daysSinceStart] == null) out[daysSinceStart] = amount;
      else out[daysSinceStart] += amount;
    }
    var now = new Date();
    var daysSinceNow = Math.floor(now.getTime() / 86400000) - firstDay + 1;
    out[daysSinceNow] = totalAmount / max;
    return out;
  }

  generateD() {
    var graphData = this.getDataForGraph();
    console.log(graphData);
    var timeSpan = Math.max.apply(null, Object.keys(graphData)) + 0;
    console.log(timeSpan);
    var d = "M0 100 ";
    var prevY = 99;
    for (var key of Object.keys(graphData)) {
      var x = key;
      var y = 99 - 99 * graphData[key];
      var xBefore = x - 1;
      x *= 300 / timeSpan;
      xBefore *= 300 / timeSpan;
      d += "L" + xBefore + " " + prevY + " ";
      d += "C" + x + " " + prevY + " " + xBefore + " " + y + " " + x + " " + y;
      prevY = y;
    }
    console.log(d);
    return d + "h100 v200 h-400 v-100";
  }

  renderCells() {
    var navigation = this.props.navigation;
    var index = navigation.getParam("index");
    var data = navigation.getParam("data");
    var want = data.items[index];
    if (want.savings.length == 0)
      return (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyText}>You have no savings</Text>
          <Text style={styles.emptyText}>
            Create your first with the "New Saving" button
          </Text>
        </View>
      );
    return want.savings.map((saving, i) => {
      return (
        <SacrificeCell
          type={saving.type}
          title={saving.title}
          month={saving.month}
          day={saving.day}
          key={i}
          amount={saving.amount}
          editOnPress={() => {
            navigation.navigate("EditSaving", {
              data: navigation.getParam("data"),
              wantIndex: index,
              index: i,
              exit: async data => {
                await navigation.setParams({
                  data: data
                });
                const exit = navigation.getParam("exit");
                exit(data);
              }
            });
          }}
        />
      );
    });
  }

  render() {
    var navigation = this.props.navigation;
    var data = navigation.getParam("data");
    var index = navigation.getParam("index");
    var want = data.items[index];
    var targetHeight =
      100 -
      (100 * this.state.price) / Math.max(this.state.sum, this.state.price);
    var graphUIComponents = (
      <Text style={styles.notEnoughData}>Not enough data for graph</Text>
    );
    if (want.savings.length > 1)
      graphUIComponents = (
        <View style={{ width: "100%" }}>
          <Svg style={styles.svg} viewBox="0 0 300 100">
            <Svg.Path
              d={this.generateD()}
              strokeWidth="2"
              stroke={colors.green}
              fill="#EAFFF3"
              strokeLinecap="round"
            />
            <Svg.Line
              x1="0"
              y1={targetHeight}
              x2="300"
              y2={targetHeight}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="4"
              strokeDasharray={[10, 10]}
            />
          </Svg>
          <View style={styles.graphLabelContainer}>
            <Text style={styles.graphLabel}>
              {want.savings[want.savings.length - 1].month +
                "/" +
                want.savings[want.savings.length - 1].day}
            </Text>
            <Text style={styles.graphLabel}>Today</Text>
          </View>
        </View>
      );
    return (
      <View style={styles.container}>
        <View style={styles.card} pointerEvents="none">
          <View style={styles.half}>
            <Text style={styles.totalPriceCaption}>costs</Text>
            <Text style={styles.totalPrice}>{"$" + want.price}</Text>
          </View>
          <View style={styles.half}>
            <Text style={styles.totalPriceCaption}>saved</Text>
            <Text style={styles.totalPrice}>{"$" + want.saved}</Text>
          </View>
          {graphUIComponents}
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.innerScrollView}
        >
          <View style={styles.middleRow}>
            <Text style={styles.sacrificesLabel}>
              {want.savings.length +
                " Saving" +
                (want.savings.length == 1 ? "" : "s")}
            </Text>
            <ActionButton
              style={styles.actionButton}
              text="New Saving"
              onPress={async () => {
                navigation.navigate("EditSaving", {
                  data: navigation.getParam("data"),
                  wantIndex: index,
                  index: -1,
                  exit: data => {
                    navigation.setParams({
                      data: data
                    });
                  }
                });
              }}
            />
          </View>
          {this.renderCells()}
        </ScrollView>
      </View>
    );
  }
}
