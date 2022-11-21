import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Logostyles = StyleSheet.create({

  Logoview:
  {
      alignItems:"center",
      marginTop:hp(0),
      marginBottom:hp(0)
},
  logo:
  {
      height:hp(25),
      width:wp(30)
    },

});
export default Logostyles;
