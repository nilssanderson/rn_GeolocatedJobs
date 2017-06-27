import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';


const SLIDE_DATA = [
  {
    text: 'Welcome to Job App',
    backgroundColor: '#03A9F4',
    color: '#fff'
  },
  {
    text: 'Use this to get a Job',
    backgroundColor: '#009688',
    color: '#fff'
  },
  {
    text: 'Set your location, then swipe away',
    backgroundColor: '#F7B816',
    color: '#fff'
  },
];


class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.setState({ token });
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('main');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}


export default WelcomeScreen;
