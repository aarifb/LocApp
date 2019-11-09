
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, CheckBox, Picker } from 'react-native';
import { ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Database from '../Database';


const db = new Database();
export default class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerStyle: {
        backgroundColor: '#0360D2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // ,
      // headerRight: (
      //   <Button
      //       large
      //       leftIcon={{name: 'save'}}
      //       title='Save'
      //       onPress={() => updateSettings()} />
      //   // <Button
      //   //   buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
      //   //   icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
      //   //   onPress={() => { 
      //   //     navigation.navigate('AddProduct', {
      //   //       onNavigateBack: this.handleOnNavigateBack
      //   //     }); 
      //   //   }}
      //   // />
      // ),
    };
  };

  constructor() {
    super();
    this.state = {
      Id: '',
      OfficeLocation: '',
      StartTime: '',
      EndTime: '',
      StartBreakTime: '',
      StopBreakTime: '',
      isLoading: false,
      isRecordExist: false,
    };

    
  }

  componentWillUnmount() {
    console.log('*** componentWillUnmount ****');
  }

  componentWillMount() {
    console.log('*** componentWillMount ****');
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.state.Id = 3;
    navigation.addListener('willFocus', () => {
      this.getItem();
    });
  }

  getItem() {
    console.log('*** getItem settingsById ****' + this.state.Id);
    db.settingsById(this.state.Id).then((data) => {
      console.log('success');
      console.log(data);
      const settings = data;
      this.setState({
        Id: settings.Id,
        OfficeLocation: settings.OfficeLocation,
        StartTime: settings.StartTime,
        EndTime: settings.EndTime,
        StartBreakTime: settings.StartBreakTime,
        StopBreakTime: settings.StopBreakTime,
        isLoading: false,
        isRecordExist: true,
      });
    }).catch((err) => {
      console.log("*** error 3 : " + err);
      console.log(err);
      this.setState = {
        isLoading: false,
        isRecordExist: true,
      }
    })
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateSettings() {

    console.log('*** updateSettings settingsById ****' + this.state.Id);

    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    let data = {
      Id: this.state.Id,
      OfficeLocation: this.state.OfficeLocation,
      StartTime: this.state.StartTime,
      EndTime: this.state.EndTime,
      StartBreakTime: this.state.StartBreakTime,
      StopBreakTime: this.state.StopBreakTime,
      // OfficeLocation: "this.state.OfficeLocation",
      // StartTime: "this.state.StartTime",
      // EndTime: "this.state.EndTime",
      // StartBreakTime: "this.state.StartBreakTime",
      // StopBreakTime: "this.state.StopBreakTime",
    }

    console.log('***** this.state.isRecordExist : ' + this.state.isRecordExist);
    if (this.state.isRecordExist == true) {

      console.log('*** Record exist ****');
      db.updateSettings(data.Id, data).then((result) => {
        console.log(result);
        this.setState({
          isLoading: false,
        });
        // this.props.navigation.state.params.onNavigateBack;
        // this.props.navigation.goBack();
      }).catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      })
    }
    else {
      console.log('*** Record not exist ****');

      db.addSettings(data).then((result) => {
        console.log(result);
        this.setState({
          isLoading: false,
        });
        // this.props.navigation.state.params.onNavigateBack;
        // this.props.navigation.goBack();
      }).catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      })

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
        >
          <View>
            <Text style={styles.sectionHeaderContainer}>
              GEOTIFICATION
            </Text>
            <TextInput
              style={styles.input}
              placeholder={'New Location'}
              value={this.state.OfficeLocation}
              onChangeText={(text) => this.updateTextInput(text, 'OfficeLocation')}
            />
            <Text style={styles.sectionHeaderContainer}>
              OFFICE HOURS
            </Text>
            <View style={styles.time}>
              <Text style={{ flex: 1, marginLeft: 10, textAlignVertical: "center" }}>
                Start Time
            </Text>
              <TextInput style={styles.input}
                placeholder={'Start Time'}
                value={this.state.StartTime}
                onChangeText={(text) => this.updateTextInput(text, 'StartTime')}
              />
            </View>
            <View style={styles.time}>
              <Text style={styles.timeText}>
                End Time
            </Text>
              <TextInput
                style={styles.input}
                placeholder={'End Time'}
                value={this.state.EndTime}
                onChangeText={(text) => this.updateTextInput(text, 'EndTime')}
              />
            </View>
            <Text style={styles.smallText} >
              Notifications will be sent at office start and end times.
            </Text>
            <Text style={styles.sectionHeaderContainer}>
              BREAK TIME
            </Text>
            <View style={styles.time}>
            <Text style={styles.timeText}>
              Start Time
            </Text>
            <TextInput
              style={styles.input}
              placeholder={'Start Time'}
              value={this.state.StartBreakTime}
              onChangeText={(text) => this.updateTextInput(text, 'StartBreakTime')}
            />
            </View>
            <View style={styles.time}>
            <Text style={styles.timeText}>
              End Time
            </Text>
            <TextInput
              style={styles.input}
              placeholder={'End Time'}
              value={this.state.StopBreakTime}
              onChangeText={(text) => this.updateTextInput(text, 'StopBreakTime')}
            />            
            </View>
            <Text style={styles.smallText} >
              Notifications will be sent at break start and end times.
            </Text>
            <Text style={styles.sectionHeaderContainer}>
              SEND NOTIFICATIONS ON
            </Text>
            <View style={{ marginBottom: 20, padding: 10, flexDirection: "row", width: '100%', height: 50, justifyContent: 'space-around', alignItems: 'stretch' }}>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} title='Sun' />
                <Text style={styles.cbText}> Sun</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} />
                <Text style={styles.cbText}> Mon</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} />
                <Text style={styles.cbText}> Tue</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} />
                <Text style={styles.cbText}> Wed</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} />
                <Text style={styles.cbText}> Thur</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} />
                <Text style={styles.cbText}> Fri</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CheckBox style={styles.cbBox} />
                <Text style={styles.cbText}> Sat</Text>
              </View>
            </View>
            <View style={styles.button}>
              <Button
                large
                leftIcon={{ name: 'save' }}
                title='Save'
                onPress={() => this.updateSettings()} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 12,
  },
  input: {
    // //marginLeft: 15,
    // marginRight: 10,
    // marginBottom: 5,
    // //height: 40,
    // paddingHorizontal: 10,
    // borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 14,
    color: 'black',
    //backgroundColor: 'lightgrey',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'red',
    flex: 2,
  },
  time: {
    marginBottom: 10,
    padding: 5,
    flexDirection: "row",
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  timeText: {
    flex: 1,
    marginLeft: 10,
    textAlignVertical: "center",
  },
  smallText: {    
    paddingBottom:10,
    marginLeft: 15,
    paddingVertical:0
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: '#5a9be6',
    color: '#ffffff',
    textAlign: 'center'
  },
  titleTextContainer: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center'
  },

  cbText: {
    //marginRight: 15,
    //marginLeft: 15,
    //paddingTop: 0,
    //color: 'red',
    //fontSize: 14,
  },
  cbBox: {
    //marginRight: 10,
    marginTop: 3,
    //paddingTop: 0,
    //marginBottom: 5,
    //marginLeft: 15,
  },
  sectionHeaderContainer: {
    backgroundColor: 'lightgrey',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: 10,
    borderColor: '#ededed',
  },
  // sectionContentContainer: {
  //   paddingTop: 8,
  //   paddingBottom: 12,
  // },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
    marginLeft: 15
  },
  button: {
    borderRadius: 4,
    padding: 10,
    textAlign: 'center',
    // marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
});


/*
*********************** UPDATE *******************************************************

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Edit Settings',
  };

  constructor() {
    super();
    this.state = {
      Id: '',
      OfficeLocation: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState.Id = 2;
    this.setState.OfficeLocation = "C";
    this.setState.isLoading = false;
    const { navigation } = this.props;
    db.settingsById(this.setState.Id).then((data) => {
      console.log('success');
      console.log(data);
      const settings = data;
      this.setState({
        Id: settings.Id,
        OfficeLocation: settings.OfficeLocation,
        isLoading: false,
      });
    }).catch((err) => {
      console.log("error 3 : " + err);
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })

  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateSettings() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    let data = {
      Id: this.state.Id,
      OfficeLocation: this.state.OfficeLocation
    }
    db.updateSettings(data.Id, data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.state.params.onNavigateBack;
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Settings ID'}
              value={this.state.Id}
              onChangeText={(text) => this.updateTextInput(text, 'Id')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Office Location'}
              value={this.state.OfficeLocation}
              onChangeText={(text) => this.updateTextInput(text, 'OfficeLocation')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.updateSettings()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


*/

/*
*************************************** INSERT ****************************************
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Add Settings',
  };
  constructor() {
    super();
    this.state = {
      Id: '',
      OfficeLocation: '',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveSettings() {
    this.setState({
      isLoading: true,
    });
    let data = {
      Id: this.state.Id,
      OfficeLocation: this.state.OfficeLocation
    }
    db.addSettings(data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.state.params.onNavigateBack;
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'ID'}
              value={this.state.Id}
              onChangeText={(text) => this.updateTextInput(text, 'Id')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Office Location'}
              value={this.state.OfficeLocation}
              onChangeText={(text) => this.updateTextInput(text, 'OfficeLocation')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveSettings()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

*/

// import React from 'react';
// import { ScrollView, StyleSheet,Text } from 'react-native';

// export default function SettingsScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       {/**
//        * Go ahead and delete ExpoLinksView and replace it with your content;
//        * we just wanted to provide you with some helpful links.
//        */}
//       <Text>Settings Screen</Text>
//     </ScrollView>
//   );
// }

// SettingsScreen.navigationOptions = {
//   title: 'app.json',
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });