import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//////////////notification/////////////////
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

//Screens
import AuthNav from './src/navigation/AuthNav/AuthNav';
import BottomTab from './src/navigation/BottomTab/BottomTab';
import OrderDetail from './src/screens/StackScreens/OrderDetail/OrderDetail';
import GuestsList from './src/screens/StackScreens/Guests/GuestsList';
import GuestsDetail from './src/screens/StackScreens/Guests/GuestsDetail';
import AddGuests from './src/screens/StackScreens/Guests/AddGuests';
import EditGuests from './src/screens/StackScreens/Guests/EditGuests';
import Settings from './src/screens/StackScreens/Settings/Settings';
import UpdateProfile from './src/screens/StackScreens/UpdateProfile/UpdateProfile';
import PrivacyTerms from './src/screens/StackScreens/Conditions/PrivacyTerms';
import CreateTrip from './src/screens/StackScreens/Trip/CreateTrip/CreateTrip';
import TripRoute from './src/screens/StackScreens/Trip/TripRoute/TripRoute';
import TripCompleted from './src/screens/StackScreens/Trip/TripRoute/TripCompleted';
import Rattings from './src/screens/StackScreens/Rattings/Rattings';
import ChatScreen from './src/screens/StackScreens/Chat/UserChat/ChatScreen';

const Stack = createNativeStackNavigator();
function App() {
  //const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState('Home');

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    //   messaging().onMessage(remoteMessage => {
    //     navigation.navigate('GooglePassword');
    //     console.log(props.navigation)
    // });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification.body,
      );
      AsyncStorage.setItem('Notification', remoteMessage.notification.body);

      //navigation.navigate('UpdateProfile');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification.body,
          );
          AsyncStorage.removeItem('Notification');
          AsyncStorage.setItem('Notification', remoteMessage.notification.body);
          //navigation.navigate('UpdateProfile');s
          //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          //setInitialRoute(remoteMessage.data.type);
        }
        setLoading(false);
      });
    if (loading) {
      return null;
    }
  }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GuestsList"
            component={GuestsList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GuestsDetail"
            component={GuestsDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddGuests"
            component={AddGuests}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditGuests"
            component={EditGuests}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PrivacyTerms"
            component={PrivacyTerms}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateTrip"
            component={CreateTrip}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripRoute"
            component={TripRoute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripCompleted"
            component={TripCompleted}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Rattings"
            component={Rattings}
            options={{
              headerShown: false,
            }}
          />
               <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
