
import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './Styles/ReviewScreenStyles';
import { MapView } from 'expo';


class ReviewScreen extends Component {
  // navigation will look for this navigationOptions object on the component class
  // e.g. ReviewScreen.navigationOptions
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    style: {
      marginTop: (Platform.OS === 'android') ? 24 : 0, // for the status bar height
    },
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={28} color={tintColor} />;
    }
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { company, formattedRelativeTime, url,
        longitude, latitude, jobtitle, jobkey
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045,
      };

      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              // map will be rendered as a static image, android pretty much needs it cached
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
