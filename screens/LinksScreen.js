import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { ListItem, Button, ListView } from 'react-native-elements';
import Database from '../Database';
import { BarChart, Grid } from 'react-native-svg-charts'

const db = new Database();
const fill = 'rgb(7, 26, 56)';
const data = [50, 10, 40, 95, 85, 35, 45];

export default class LinksScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Reports',
      headerStyle: {
        backgroundColor: '#0360D2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => {
            navigation.navigate('AddProduct', {
              onNavigateBack: this.handleOnNavigateBack
            });
          }}
        />
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      logs1: [],
      notFound: 'Products not found.\nPlease click (+) button to add it.',

      exampleData: [
        { name: 'Watch', price: '100' },
        { name: 'Big Watch', price: '888' },
        { name: 'Expensive Watch', price: '999999' },
        { name: 'Donald Trump', price: '-1' },
      ]

    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      console.log('##################################################### componentDidMount ****');
      this.getDailyLogs();
    });
  }

  getDailyLogs() {

    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    db.listDailyLogs().then((data) => {

      this.setState({
        logs1: data,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  keyExtractor = (item, index) => index.toString()

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.activity}>
    //       <ActivityIndicator size="large" color="#0000ff" />
    //     </View>
    //   )
    // }
    // if (this.state.products.length === 0) {
    //   return (
    //     <View>
    //       <Text style={styles.message}>{this.state.notFound}</Text>
    //     </View>
    //   )
    // }
    return (
      <View style={styles.container}>

        <View style={styles.sectionGraph}>
          <BarChart
            style={{ height: 200, color: 'red' }}
            data={data}
            svg={{ fill }}
            showGrid={true}
            animate={true}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <Grid />
          </BarChart>
        </View>
        <View>
          <View style={{ height: 80, backgroundColor: '#0360D2' , flex: 1, flexDirection: 'row' }} >
            <View style={styles.itemStyle1}>
              <Text> Log Date</Text>
            </View>
            <View style={styles.itemStyle1}>
              <Text> CheckIn DateTime  </Text>
            </View>
            <View style={styles.itemStyle1}>
              <Text> CheckOut DateTime  </Text>
            </View>
          </View>
          <FlatList
            data={this.state.logs1}
            renderItem={({ item }) =>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} >
                <View style={styles.itemStyle1}>
                  <Text> {item.LogDate}</Text>
                </View>
                <View style={styles.itemStyle1}>
                  <Text>{item.CheckInDateTime}  </Text>
                </View>
                <View style={styles.itemStyle1}>
                  <Text>{item.CheckOutDateTime}  </Text>
                </View>
              </View>
            }
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,

  },
  sectionGraph: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red'
  },
  itemStyle1: {


    height: 30,
    color: '#fff',

    padding: 3,
  },
});


// import React from 'react';
// import { ScrollView, StyleSheet,Text } from 'react-native';


// export default function LinksScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       {/**
//        * Go ahead and delete ExpoLinksView and replace it with your content;
//        * we just wanted to provide you with some helpful links.
//        */}
//       <Text>Link Screen</Text>
//     </ScrollView>
//   );
// }

// LinksScreen.navigationOptions = {
//   title: 'Links',
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
