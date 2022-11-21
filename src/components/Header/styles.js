import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
    //Header
    headerView: {
      flexDirection: 'row',
      backgroundColor: Colors.Appthemecolor,
      height: Height * 0.08,
      width: Width ,
      paddingHorizontal:wp(0),
      justifyContent:'center',
      alignItems:'center'
    },
    iconview:
    { 
        justifyContent: 'center', 
        marginRight: wp(0)
     },
    labelView: {
      marginHorizontal: wp(5),
      flexDirection: 'column',
      width: Width * 0.7,
      alignItems:'center',
      justifyContent:'center',
  marginTop:hp(5)
    },
    logo:
    {
        height:wp(16),
        width:wp(16)
      },
  
label:
{ 
    color: 'white',
     fontSize: hp(2.5), 
     //fontWeight: 'bold', 
     fontFamily:fontFamily.Lato_Regular,
    // marginTop:hp(4.5) ,
     textAlign:"center"
    }

  });
  
  
  export default styles;
  