import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

//////////////app images/////////
import { appImages } from '../../constant/images';

////////////////app fonts////////
import { fontFamily } from '../../constant/fonts';

////////////////app redux///////////
import { useSelector } from 'react-redux';

const DashboardHeader = ({ navigation, headerlabel,image}) => {
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (
      <View style={[style.headerView]} >
          <View style={style.labelView}>
          <Text style={style.labelmaintext}>Welcome</Text>
          <Text style={style.labelsubtext}>{headerlabel}</Text>
          </View>
          <Image
            source={appImages.ProfileUser}
            style={style.logo}
            resizeMode='contain'
          />

            </View>

  );

};
const style = StyleSheet.create({
    headerView: {
        width:wp(100),
        height:hp(15),
      alignItems: 'center',
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:wp(7),
     borderBottomLeftRadius:wp(3),
     borderBottomRightRadius:wp(3),
     shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 19,
     backgroundColor:Colors.Appthemecolor
    },
  
    labelView: {
      width: wp(60),
      justifyContent: 'center',

    },
    logo:
    {
        height:wp(16),
        width:wp(16)
      },
      labelmaintext:
{ 
    color: 'white',
     fontSize: hp(2.2), 
     fontWeight: 'bold', 
     fontFamily:fontFamily.Poppins_Bold,
     marginBottom:wp(2)
    },
    labelsubtext:
    { 
        color: 'white',
         fontSize: hp(1.8), 
         fontWeight: '100', 
         fontFamily:fontFamily.Poppins_Light,
        }
  });
export default DashboardHeader;