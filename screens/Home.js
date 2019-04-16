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
  AsyncStorage
} from "react-native";
import ThumbNail from "../components/thumbNail";
import ActionButton from "../components/ActionButton";
import { colors } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    backgroundColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  totalPrice: {
    fontSize: 40,
    color: "white",
    fontFamily: "light"
  },
  half: {
    width: "30%",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 13
  },
  totalPriceCaption: {
    fontSize: 16,
    color: "white",
    fontFamily: "light"
  },
  scrollView: {
    flex: 1
  },
  innerScrollView: {
    // paddingTop: 74,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  actionButton: {},
  scrollViewHeader: {
    fontSize: 34,
    fontFamily: "light"
  },
  middleRow: {
    // backgroundColor: "yellow",
    paddingLeft: 34,
    paddingRight: 34,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    // backgroundColor: "yellow",
    width: "100%"
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
  }
});

export default class Home extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {};
  // };

  state = {
    data: {
      items: [],
      totalPrice: 0,
      totalSaved: 0
    }
  };

  async componentDidMount() {
    const currentData = await AsyncStorage.getItem("data");
    if (currentData == null) {
      await AsyncStorage.setItem(
        "data",
        JSON.stringify({
          items: [],
          totalPrice: 0,
          totalSaved: 0
        })
      );
    } else {
      await this.setState({
        data: JSON.parse(currentData)
      });
    }
    console.log(currentData);
    // await AsyncStorage.setItem(
    //   "data",
    //   JSON.stringify({
    //     items: [],
    //     totalPrice: 0,
    //     totalSaved: 0
    //   })
    // );
  }

  renderItems() {
    if (this.state.data.items.length == 0)
      return (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyText}>You have no wants</Text>
          <Text style={styles.emptyText}>
            Create your first with the "Add Want" button
          </Text>
        </View>
      );
    return this.state.data.items.map((item, i) => {
      return (
        <ThumbNail
          text={item.name}
          saved={item.saved}
          price={item.price}
          icon={item.icon}
          navigation={this.props.navigation}
          key={i}
          onPress={() => {
            this.props.navigation.navigate("ItemView", {
              data: this.state.data,
              index: i,
              exit: data => {
                console.log("home exit");
                this.setState({
                  data: data
                });
                console.log("end of exit");
              }
            });
          }}
        />
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.half}>
            <Text style={styles.totalPrice}>
              {"$" + this.state.data.totalPrice}
            </Text>
            <Text style={styles.totalPriceCaption}>in wants</Text>
          </View>
          <View style={styles.half}>
            <Text style={styles.totalPrice}>
              {"$" + this.state.data.totalSaved}
            </Text>
            <Text style={styles.totalPriceCaption}>in savings</Text>
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.innerScrollView}
        >
          <View style={styles.middleRow}>
            <Text style={styles.scrollViewHeader}>
              {this.state.data.items.length +
                " Item" +
                (this.state.data.items.length == 1 ? "" : "s")}
            </Text>
            <ActionButton
              style={styles.actionButton}
              text="Add Want"
              onPress={() => {
                this.props.navigation.navigate("EditWant", {
                  index: -1,
                  data: this.state.data,
                  exit: data => {
                    this.setState({
                      data: data
                    });
                  }
                });
              }}
            />
          </View>
          {this.renderItems()}
        </ScrollView>
      </View>
    );
  }
}

/*

ThumbNail
  text="Apple Watch"
  saved="40"
  price="150"
  icon="paperclip"
/>
<ThumbNail
  text="Apple Watch"
  saved="40"
  price="150"
  icon="paperclip"
/>
<ThumbNail
  text="Apple Watch"
  saved="40"
  price="150"
  icon="paperclip"
/>
<ThumbNail
  text="Apple Watch"
  saved="40"
  price="150"
  icon="paperclip"
/>
<ThumbNail
  text="Apple Watch"
  saved="40"
  price="150"
  icon="paperclip"
/>
<ThumbNail
  text="Apple Watch"
  saved="40"
  price="150"
  icon="paperclip"
/>

*/
