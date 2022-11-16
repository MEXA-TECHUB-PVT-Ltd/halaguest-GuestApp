
import * as React from 'react';
import { View, Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import SplashScreen from '../../screens/Auth/Splash/Splash';
import Login from '../../screens/Auth/Login/Login';
import Verification from '../../screens/Auth/Verification/Verification';
import CreateAccount from '../../screens/Auth/CreateAccount/CreateAccount';


const Stack = createNativeStackNavigator();
function AuthNav() {
  return (
    <Stack.Navigator>
     <Stack.Screen name="SplashScreen" component={SplashScreen}
        options={{
          headerShown: false,
        }} />
         <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false,
        }} />
          <Stack.Screen name="Verification" component={Verification}
        options={{
          headerShown: false,
        }} />
          <Stack.Screen name="CreateAccount" component={CreateAccount}
        options={{
          headerShown: false,
        }} />

    </Stack.Navigator>
  );
}

export default AuthNav;