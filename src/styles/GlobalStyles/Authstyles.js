import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  import { fontFamily } from '../../constant/fonts';

const Authstyles = StyleSheet.create({
 

    maintextview:
    {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: wp('5%')
    },
    maintext:
    {
      color: 'white',
      fontWeight: 'bold',
      fontSize: hp('3.2%'),
      fontFamily: 'Raleway',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    subtextview:
    {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:hp(2),
      marginBottom:hp(0)
    },
    subtext:
    {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: fontFamily.Poppins_Regular,
      fontSize: hp(2.6),
      width: wp("72%"),
      marginBottom:wp('3%'),
      textAlign:'center'
    },
    subundertext:
    {
      color: '#D8D8D8',
      fontFamily:fontFamily.Lato_Light,
      //fontWeight: '400',
      fontSize: hp(1.8),
      width: wp("72%"),
      marginBottom:wp(5),
      textAlign:'center'
    },
    toptext:
    {
      color: 'white',
      //fontWeight: '400',
      fontFamily:fontFamily.Lato_Regular,
      fontSize: hp(2.5),
     marginTop: hp(2)
    },
 
});
export default Authstyles;
