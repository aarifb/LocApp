import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

//const timer = require('react-native-timer');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      showMsg: false,
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable: false,
      totalCount: '00:00'
    };
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
    // timer.clearTimeout(this);
    clearInterval(this.state.timer);
  }

  onButtonStart = () => {

    let timer = setInterval(() => {

      var num = (Number(this.state.seconds_Counter) + 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);
    this.setState({ timer });

    this.setState({ startDisable: true })
  }

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({ startDisable: false })
    this.state.totalCount = this.state.minutes_Counter + ':' + this.state.seconds_Counter
  }


  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.HeaderText}>
            <Text>"Music is moonlight in the gloomy night of life." - Jean Paul</Text>
          </View>

          <View style={styles.containerTimer}>
            <Text style={styles.timerText}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
          </View>
          {/* <View tyle={styles.HeaderText}>
          <TouchableOpacity onPress={() => requestAnimationFrame(() => this.showMsg())}>
          <Text>Press Me</Text>
        </TouchableOpacity>
        {this.state.showMsg ? (
          <Text>Hello!!</Text>
        ) : (
          null
        )}
          </View> */}
        </ScrollView>
        <View style={styles.containerTabBottom}>
          <View style={styles.containerCheck}>
            <View style={styles.itemCheck}>
              <TouchableOpacity
                onPress={this.onButtonStop}
                activeOpacity={0.6}
                style={[{ backgroundColor: '#0360D2' }]} >
                <Text style={styles.tabBarInfoText}>Check Out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemCheck}>
              <TouchableOpacity
                onPress={this.onButtonStart}
                activeOpacity={0.6}
                style={[ { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#0360D2' }]}
                disabled={this.state.startDisable} >
                <Text style={styles.tabBarInfoText}>Check In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerBottom}>
            <View style={styles.itemBottom}>
              <Text style={styles.tabBarInfoTextBottom}> {this.state.time}</Text>
            </View>
            <View style={styles.itemBottom}>
              <Text style={styles.tabBarInfoTextBottom}>Total {this.state.totalCount}  </Text>
            </View>
          </View>
        </View>
      </View>

    );
  }
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#0360D2',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#0360D2',
    color: '#fff',
    paddingVertical: 20,
    tintColor: '#fff',
  },

  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  containerCheck: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: "center",
    alignItems: 'flex-start', // if you want to fill rows left to right

  },
  itemCheck: {
    width: '50%', // is 50% of container width
    textAlign: "center",
    backgroundColor: '#0360D2',
    height: 80,
    color: '#fff',
    justifyContent: 'center'
  },
  tabBarInfoText: {
    fontSize: 27,
    color: '#fff',
    textAlign: 'center'
  },
  containerBottom: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: "center",
    alignItems: 'flex-start', // if you want to fill rows left to right

  },
  itemBottom: {
    width: '50%', // is 50% of container width
    textAlign: "center",
    backgroundColor: '#232140',
    height: 40,
    color: '#fff',
    justifyContent: 'center'
  },
  tabBarInfoTextBottom: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  containerTabBottom: {
    textAlign: "center",
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'column',

  },
  timerText: {
    fontSize: 40,
    color: '#0360D2',
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140
  },
  containerTimer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  HeaderText: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    top: 0
  },
  button: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  },
  counterText:{
 
    fontSize: 28,
    color: '#000'
  }
});
