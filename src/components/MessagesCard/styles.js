import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const styles = StyleSheet.create({


card:
{
  margin:wp('2%'),
  borderRadius:wp(4),
 width: wp('90%'),
  alignSelf:'center',
  backgroundColor:Colors.cardcolor,
  paddingHorizontal:wp(5),
  paddingVertical:hp(2)
},
  topview:
  {

    width:wp(80),
    paddingBottom:hp(2),

},
useritemtext:
{
  color: 'white',
  fontWeight: '600',
  fontSize: hp(2),
},
itemtext:
{
  color:'white',
  fontWeight: '400',
  fontSize: hp(1.7),
  width:wp(65),

},
cardtext:
{
  color:'white',
   fontFamily:'Poppins',
   fontSize:hp(2),
   textAlign:"right",
   fontWeight:'bold'
//marginTop:hp(1)

},
cardrowtext:
{
  color:'#D8D8D8',
  fontWeight: '600',
  fontSize: hp(1.8),
},
  });
  export default styles;
  