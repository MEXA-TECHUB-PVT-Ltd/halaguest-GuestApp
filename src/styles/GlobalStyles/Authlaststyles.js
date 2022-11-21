import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
  import { fontFamily } from '../../constant/fonts';

const Authlaststyles = StyleSheet.create({
 
    lasttextview:
    { 
      //position:'absolute',
      bottom:wp(3),
      flexDirection: 'row',
       alignContent:'center',
      justifyContent:'center',
      alignSelf:'center',
     //alignItems:'flex-end',
    // marginTop:wp(10),
     marginBottom:wp(0),
     top:hp(28)
    },
    lasttext:
    {
      color:Colors.Appthemecolor,
      //fontWeight: '300',
      fontSize: hp(1.8),
      fontFamily:fontFamily.Lato_Regular
    },

});
export default Authlaststyles;
