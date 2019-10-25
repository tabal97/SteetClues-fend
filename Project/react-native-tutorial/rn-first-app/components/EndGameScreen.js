import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";
import CountDown from "react-native-countdown-component";

class EndGameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRound: 0,
      host: null
    };

    this.pusher = new Pusher("e997856aae5ff49795fd", {
      cluster: "eu",
      forceTLS: true
    });

    const pin = this.props.navigation.getParam("pin");
    this.channel = this.pusher.subscribe(pin);
    this.channel.bind("pusher:subscription_succeeded", () => {
      this.channel.bind("nextRound", data => {
        this.handleNextRound();
      });
    });
  }

  render() {
    // const latitude = this.props.navigation.getParam("latitude");
    // const longitude = this.props.navigation.getParam("longitude");
    // const targetLatitude = this.props.navigation.getParam("targetLatitude");
    // const targetLongitude = this.props.navigation.getParam("targetLongitude");
    const name = this.props.navigation.getParam("name");
    // const score = this.props.navigation.getParam("score");
    // const { host } = this.state;
    return (
      <View style={styles.text}>
        <Text>{`Name: Test`} </Text>

        {/* <Text>{`Host: ${host}`} </Text> */}
        {/* {host && (
          <Button
            title="Finish Game"
            onPress={() => this.handleNextRound(true)}
          />
        )} */}
      </View>
    );
  }
  componentDidMount() {
    const host = this.props.navigation.getParam("host");
    if (host) {
      this.setState({ host });
    }
  }
}

//   handleNextRound = initialStart => {
//     // const { currentRound, targetLocations } = this.state;
//     const pin = this.props.navigation.getParam("pin");
//     const name = this.props.navigation.getParam("name");
//     // const targetLocation = targetLocations[3];
//     // console.log(targetLocation);
//     const nextLat = this.props.navigation.getParam("nextLat");
//     const nextLong = this.props.navigation.getParam("nextLong");
//     if (initialStart) {
//       axios
//         .post("http://192.168.230.176:5000/next_round", { pin: pin })
//         .then(({ data }) => {})
//         .catch(console.log);
//     } else {
//       this.props.navigation.push("TabNavigator", {
//         name,
//         pin,
//         targetLocation: [nextLat, nextLong]
//       });
//     }
//   };

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    padding: 20,
    backgroundColor: "skyblue"
  }
});

export default EndGameScreen;