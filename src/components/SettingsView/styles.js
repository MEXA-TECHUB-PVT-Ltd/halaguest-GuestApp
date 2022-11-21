import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  //////////////////app fonts////////////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({

  mainview: {
    flexDirection: 'row',
    marginTop:wp(5),
    marginBottom: wp(2),
    justifyContent:'center',
    backgroundColor: Colors.appinputscolor,
    width: wp(88),
    height: wp(15),
    alignSelf: 'center',
    borderRadius: wp(5),
    paddingLeft: wp(2),
    alignItems: 'center'
  },

  labeltext:
  {
    color: '#707070',
fontFamily:fontFamily.Poppins_Medium,
    fontSize: hp(1.7),
  },


});
export default styles;
