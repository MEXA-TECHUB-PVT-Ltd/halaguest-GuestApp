
import messaging from '@react-native-firebase/messaging';

export const checkPermission = async () => {
    //console.log('check permission function call');
    const enabled = await messaging().hasPermission();
    messaging().notifi;
    console.log('check permission function call enable', enabled);
    if (enabled) {
     return getToken();
    } else {
      requestPermission();
    }
  };
  const getToken = async () => {
    //console.log('get token call');
    // let fcmToken = await AsyncStorage.read('fcmToken');
    // console.log('get token call fcm token', fcmToken);
    // if (!fcmToken) {
    const fcmToken = await messaging().getToken();
    // }
    // if (fcmToken) {

    // await AsyncStorage.save('fcmToken', fcmToken);
    console.log('check fcm token', fcmToken);
    return fcmToken
    //await AsyncStorage.setItem('Device_id', fcmToken);
    //const asyncFcmToken = await AsyncStorage.getItem('Device_id');
    //console.log('ASYNC FCM TOKEN=============', asyncFcmToken);
  };
  const requestPermission = async () => {
    //console.log('requestPermission call');
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {}
  };