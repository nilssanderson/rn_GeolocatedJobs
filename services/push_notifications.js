import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';


export default async () => {
  const previousToken = await AsyncStorage.getItem('pushToken');
  console.log(previousToken);

  if (previousToken) {
    return;
  } else {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    const token = await Notifications.getExponentPushTokenAsync();

    await fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: { token }
      })
    });

    AsyncStorage.setItem('pushToken', token);
  }
};
