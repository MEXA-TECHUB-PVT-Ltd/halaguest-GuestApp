import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Uploadstyles = StyleSheet.create({

    upload:
    {
        borderColor: Colors.inputbordercolor ,
    height:wp('33%'),
    width:wp('70%'),
    borderWidth:1,
    alignSelf:'center',
    alignItems:'center',justifyContent:'center',
    borderRadius:20,
    },
});
export default Uploadstyles;
