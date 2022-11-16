import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const TopTabstyles = StyleSheet.create({
TopTabView:
    {
        flexDirection:'row',
    justifyContent:'space-between',
   //marginHorizontal:wp(0),
   paddingHorizontal:wp(3),
   width:wp(95),
   height:hp(10),
   alignItems:"center",
   alignSelf:'center',
   marginBottom:hp(5),
   marginTop:hp(5)
   },

});
export default TopTabstyles;
