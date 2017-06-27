
import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Button } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;


class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Continue"
          raised
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.backgroundColor }]}
        >

          <Text style={[styles.textStyle, { color: slide.color }]} >
            {slide.text}
          </Text>

          <View style={styles.slideIndicatorStyles}>
            { (i === 0) ? <Text>O</Text> : <Text>o</Text> }
            { (i === 1) ? <Text>O</Text> : <Text>o</Text> }
            { (i === 2) ? <Text>O</Text> : <Text>o</Text> }
          </View>

          <View style={styles.footerStyle}>
            {this.renderLastSlide(i)}
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}


const styles = {
    slideStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: SCREEN_WIDTH
    },
    headerText: {
      fontFamily: 'khula',
      fontSize: 30,
      letterSpacing: 2,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 40,
      color: 'white',
      justifyContent: 'center',
      textAlign: 'center',
      // textShadowColor: '#888',
      // textShadowOffset: { height: 1, width: 1 }
    },
    slideText: {
      fontSize: 18,
      // letterSpacing: -.5,
      padding: 30,
      color: 'white',
      justifyContent: 'center',
      textAlign: 'center',
      // textShadowColor: '#888',
      // textShadowOffset: { height: 1, width: 1 }
    },
    buttonStyle: {
      backgroundColor: '#0288D1',
      // height: 70,
      width: SCREEN_WIDTH
    },
    footerStyle: {
      position: 'absolute',
      bottom: 0,
      justifyContent: 'center',
    },
    slideIndicatorStyles: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    slideIndicatorItemStyles: {
      height: 10,
      margin: 5,
      width: 10
    },
    slideIndicatorItemUnselectedStyles: {
      height: 8,
      margin: 5,
      width: 8
    }
};


export default Slides;
