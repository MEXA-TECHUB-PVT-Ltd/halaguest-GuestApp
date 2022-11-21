import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: 'white'
  },
  textview:
  {
    alignItems:'center',
  justifyContent:'center',
  marginHorizontal:wp(5),
  marginTop:hp(3)
},
  text:
  {
    color: '#000000',
fontFamily:fontFamily.Poppins_Light,
    fontSize: hp(1.7),
  },

});
export default styles;
