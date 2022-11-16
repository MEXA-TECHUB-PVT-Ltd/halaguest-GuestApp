import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor:'white'
  },
  userimage:
  {
      borderColor:'#AAAAAA',
      borderWidth:1,
      width:wp(30),
      height:hp(14),
borderRadius:wp(25),
backgroundColor:'white',
alignItems:'center',
justifyContent:'center',
alignSelf:'center',
marginBottom:hp(0),
marginTop:hp(2)
},
image: {
    height:wp(30),
    width:wp(30),
borderRadius:80,
  },
});
export default styles;
