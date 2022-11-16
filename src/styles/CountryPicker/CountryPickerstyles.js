import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
  import { fontFamily } from '../../constant/fonts';

const CountryPickerstyles = StyleSheet.create({
 
///////////////////////country picker/////////////////
countrypicker:
{
    flexDirection:'row',
    marginLeft:wp(5),
    marginRight:wp(5),
    // borderRightColor:'black',
    // borderRightWidth:1
            },
            verticallineview:
{
  height:hp(7),
    marginLeft:wp(5),
    borderRightColor:'#6B6B6B',
    borderRightWidth:1
            },

            codetext:
            { 
                fontSize: hp(2), 
                fontFamily:fontFamily.Poppins_Regular,
            color: '#6B6B6B',
            padding:'0.3%'
         },
 


});
export default CountryPickerstyles;
