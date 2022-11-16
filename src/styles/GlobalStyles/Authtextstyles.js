import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';

////////////////app colors////////////////
import Colors from '../../utills/Colors';

///////////app height width///////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Authtextstyles = StyleSheet.create({
 
    textview:
    {
     marginHorizontal:wp(6),
     marginTop:hp(5),
  marginBottom:hp(2),
     },
    images:
    {
  height:wp(22),
  width:wp(22)
    },
    toptext:
    {
      color: Colors.Appthemecolor,
      fontWeight: 'bold',
      fontSize: hp(3),
     
    },
    subtextview:
    {
      marginTop:wp(4),
      marginBottom:wp('0%'),
      justifyContent: 'center',
  
    },
    subtext:
    {
      color: 'rgba(164, 164, 164, 1)',
      fontWeight: '400',
      fontSize: hp(2),
      width: wp(80),
      marginTop:wp(2),
      marginBottom:wp(2)
    },
 
});
export default Authtextstyles;
