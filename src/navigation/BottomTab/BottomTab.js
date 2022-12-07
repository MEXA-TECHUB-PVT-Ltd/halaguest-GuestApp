import React from 'react';
import { StyleSheet, View,Image,Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { IconButton } from 'react-native-paper';

//////////////app icons///////////
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

//////////////////app styles///////////////////
import Colors from '../../utills/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

//////////////////app images////////////
import { appImages } from '../../constant/images';

///////////app fonts////////////
import { fontFamily } from '../../constant/fonts';

const Tab = createBottomTabNavigator();

//screeens 
import Home from '../../screens/BottomTab/Home/Dashboard';
import Orders from '../../screens/BottomTab/Orders/Orders';
import Transaction from '../../screens/BottomTab/Transaction/Transaction';
import Profile from '../../screens/BottomTab/Profile/Profile';



function BottomTab() {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={Colors.Appthemecolor}

      screenOptions={
        {
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: Colors.Appthemecolor,
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            height: hp(8),
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.57,
            shadowRadius: 15.19,
            elevation: 23, 
          },

        }}
      tabBarOptions={{
        activeTintColor: Colors.Appthemecolor,

        labelStyle: {
          fontSize: 12,
          marginBottom: 12,
          padding: 0,
          fontWeight: 'bold',
        },

      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <View style={style.maintabview}>
            <View style={[style.tab, focused ? style.selectedTab : null]}>
            <Entypo name="home" color={!focused ? 'grey' :'white'} size={25} />
               {/* <Image
                        source={appImages.Camera}
                        style={{ width: wp(6), height: hp(3.5)}}
                      /> */}
            </View>
            <Text style={style.tabtextcolor}>{!focused ?null:'Home'}</Text>
            </View>
          ),
        }} />
              <Tab.Screen name="Orders" component={Orders}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <View style={style.maintabview}>
            <View style={[style.tab, focused ? style.selectedTab : null]}>
            {/* <Ionicons name="cart" color={!focused ? 'grey' :'white'} size={25} /> */}
            <IconButton
                icon={appImages.Trips}
                iconColor={ !focused ? 'grey':'white'}
                style={{backgroundColor: focused ? null:'white',color:"red"}}
                size={30}
              />
               {/* <Image
                        source={appImages.Trips}
                        style={{ width: wp(6), height: hp(3.5)}}
                        color={!focused ?null:'red'}
                        resizeMode='contain'
                      /> */}
            </View>
            <Text style={style.tabtextcolor}>{!focused ?null:'Orders'}</Text>
            </View>
          ),
        }} />
                {/* <Tab.Screen name="Transaction" component={Transaction}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <View style={style.maintabview}>
            <View style={[style.tab, focused ? style.selectedTab : null]}>
 
            <IconButton
                icon={appImages.Transaction}
                iconColor={ !focused ? 'grey':'white'}
                style={{backgroundColor: focused ? null:'white',color:"red"}}
                size={30}
              />
        
            </View>
            <Text style={style.tabtextcolor}>{!focused ?null:'Transaction'}</Text>
            </View>
          ),
        }} /> */}
           <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <View style={style.maintabview}>
            <View style={[style.tab, focused ? style.selectedTab : null]}>
            <Ionicons name="person" color={!focused ? 'grey' :'white'} size={25} />
    
            </View>
            <Text style={style.tabtextcolor}>{!focused ?null:'Profile'}</Text>
            </View>
          ),
        }} />
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  maintabview: {
    justifyContent: 'center',
    alignItems: 'center',
   flexDirection:'row'
  },

  tab: {
    width: wp(12),
    height: hp(5.5),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
   // flexDirection:'row'
  },
  tabtextcolor:
  {
color:Colors.BottomTabcolor,
fontSize:hp(1.5),
fontWeight:'300',
fontFamily:fontFamily.Poppins_Medium,
marginLeft:wp(1)
  },
  selectedTab: {
    backgroundColor: Colors.BottomTabcolor
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
export default BottomTab;