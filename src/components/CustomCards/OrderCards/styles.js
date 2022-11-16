import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';

/////////////////app colors/////////////
import Colors from '../../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts///////////////////
import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
card:
{
  margin:wp('2%'),
  borderRadius:wp(4),
justifyContent:'center',
 width: wp(93),
  backgroundColor:'white',
  paddingHorizontal:wp(5),
  paddingVertical:hp(2),
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,
},
itemmaintext:
{
  color: Colors.BottomTabcolor,
  fontSize: hp(1.6),
  fontFamily:fontFamily.Poppins_Regular,
  marginLeft:wp(2)
},
itemsubtext:
{
  color: '#303030',
  fontSize: hp(1.8),
  fontFamily:fontFamily.Poppins_SemiBold
},

Triptext:
  {
    fontFamily:fontFamily.Poppins_SemiBold,
    fontSize:hp(1.7),
    color: Colors.Appthemecolor,
fontWeight:'700'
  },
  Timetext:
  {
    fontFamily:fontFamily.Poppins_Medium,
    fontSize:hp(1.5),
    color: '#303030',
  },
  pricetext:
  {
    fontFamily:fontFamily.Poppins_SemiBold,
    fontSize:hp(1.5),
    color: '#303030',
  },

  });
  export default styles;
  