import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;


const SwipeStyles = {
  containerStyles: {
  },
  cardStyles: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default SwipeStyles;
