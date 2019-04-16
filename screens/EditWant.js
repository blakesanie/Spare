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
  Animated,
  TextInput,
  AsyncStorage
} from "react-native";
import { Svg } from "expo";
import { AntDesign } from "@expo/vector-icons";
import CheckButton from "../components/CheckButton";
import { colors } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  scrollView: {
    flex: 1
  },
  innerScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    alignItems: "center"
  },
  iconHolder: {
    width: "25%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {},
  textInput: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    width: "100%",
    fontSize: 22,
    fontFamily: "light",
    marginBottom: 20
  },
  label: {
    fontFamily: "light",
    fontSize: 30,
    marginBottom: 20
  },
  remove: {
    color: "red",
    fontFamily: "light",
    margin: 15,
    fontSize: 20,
    textAlign: "center"
  }
});

export default class EditWant extends React.Component {
  static navigationOptions = ({ navigation }) => {
    var index = navigation.getParam("index");
    return {
      headerRight: (
        <CheckButton
          navigation={navigation}
          onPress={navigation.getParam("submit")}
        />
      ),
      title: (index == -1 ? "New" : "Edit") + " Want"
    };
  };

  iconList = [
    "customerservice",
    "creditcard",
    "book",
    "home",
    "setting",
    "phone",
    "paperclip",
    "lock",
    "qrcode",
    "calculator",
    "key",
    "flag",
    "tool",
    "isv",
    "Trophy",
    "sound",
    "Safety",
    "wifi",
    "shoppingcart",
    "videocamera",
    "tagso",
    "pushpino",
    "iconfontdesktop",
    "mobile1",
    "car",
    "gift",
    "rest",
    "bulb1",
    "rocket1",
    "find"
  ];

  state = {
    nameText:
      this.props.navigation.getParam("index") == -1
        ? ""
        : this.props.navigation.getParam("data").items[
            this.props.navigation.getParam("index")
          ].name,
    priceText:
      this.props.navigation.getParam("index") == -1
        ? ""
        : this.props.navigation.getParam("data").items[
            this.props.navigation.getParam("index")
          ].price + "",
    icons: this.iconList,
    iconIndex:
      this.props.navigation.getParam("index") == -1
        ? 0
        : this.iconList.indexOf(
            this.props.navigation.getParam("data").items[
              this.props.navigation.getParam("index")
            ].icon
          )
  };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.checkInputs.bind(this) });
  }

  async setNewIcon(i) {
    this.setState({
      iconIndex: i
    });
  }

  async submit() {
    var navigation = this.props.navigation;
    var index = navigation.getParam("index");
    var current = navigation.getParam("data");
    var initialPrice =
      index == -1 ? 0 : navigation.getParam("data").items[index].price;
    var newWant = {
      name: this.state.nameText || current.items[index].name,
      price: parseInt(this.state.priceText) || current.items[index].price,
      icon: this.state.icons[this.state.iconIndex],
      saved: index == -1 ? 0 : current.items[index].saved,
      savings: index == -1 ? [] : current.items[index].savings
    };
    if (index == -1) {
      current.items.push(newWant);
    } else {
      current.items[index] = newWant;
    }
    current.totalPrice += newWant.price - initialPrice;
    await AsyncStorage.setItem("data", JSON.stringify(current));
    const exit = navigation.getParam("exit");
    exit(current);
    this.props.navigation.goBack();
  }

  checkInputs() {
    if (this.state.nameText == "") {
      alert("No Name Given");
      return;
    }
    if (this.state.priceText.indexOf(".") > -1) {
      alert("Price must be whole number");
      return;
    }
    if (this.state.priceText == "") {
      alert("Price must be > $0");
      return;
    }
    if (parseInt(this.state.priceText) == 0) {
      alert("Price must be > $0");
      return;
    }
    this.submit();
  }

  async removeItem() {
    var navigation = this.props.navigation;
    var index = navigation.getParam("index");
    var current = navigation.getParam("data");
    current.totalPrice = current.totalPrice - current.items[index].price;
    current.totalSaved = current.totalSaved - current.items[index].saved;
    current.items = current.items.filter((val, i) => {
      return i != index;
    });
    await AsyncStorage.setItem("data", JSON.stringify(current));
    const exit = navigation.getParam("exit");
    exit(current);
    this.props.navigation.navigate("Home");
  }

  renderIcons() {
    return this.state.icons.map((val, i) => {
      return (
        <TouchableOpacity
          style={[
            styles.iconHolder,
            {
              opacity: this.state.iconIndex == i ? 1 : 0.2
            }
          ]}
          onPress={() => {
            this.setNewIcon(i);
          }}
          key={Math.random()}
        >
          <AntDesign
            style={styles.icon}
            name={val}
            size={42}
            color={colors.green}
            key={Math.random()}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    var navigation = this.props.navigation;
    var index = navigation.getParam("index");
    var item = navigation.getParam("data").items[index];
    var removeComponent =
      index == -1 ? null : (
        <TouchableOpacity
          onPress={() => {
            this.removeItem();
          }}
        >
          <Text style={styles.remove}>Remove Item</Text>
        </TouchableOpacity>
      );
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          clearButtonMode="always"
          placeholder="Beach Vacation"
          style={styles.textInput}
          onChangeText={text => this.setState({ nameText: text })}
          editable={true}
          value={this.state.nameText}
        />
        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          clearButtonMode="always"
          placeholder="2699"
          style={styles.textInput}
          onChangeText={text => this.setState({ priceText: text })}
          keyboardType="numeric"
          value={this.state.priceText}
        />
        <Text style={styles.label}>Icon</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.innerScrollView}
        >
          {this.renderIcons()}
        </ScrollView>
        {removeComponent}
      </View>
    );
  }
}
