import React from 'react';
import {StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts//////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
menuoptiontext:
{
    color:'#707070',
    fontFamily:fontFamily.Poppins_Regular,
    fontSize:hp(2),
    marginLeft:wp(3)
}
  });
  export default styles;
  