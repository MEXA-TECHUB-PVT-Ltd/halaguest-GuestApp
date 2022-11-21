import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';

/////////////////app colors/////////////
import Colors from '../../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts///////////////////
import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
card:
{
  margin:wp('2%'),
  borderRadius:wp(4),
 width: wp(93),
  alignSelf:'center',
  alignItems:'center',
  backgroundColor:'white',
  paddingHorizontal:wp(5),
  paddingVertical:hp(2),
  flexDirection:'row',
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,
},
itemmaintext:
{
  color: Colors.Appthemecolor,
  fontSize: hp(1.8),
  fontFamily:fontFamily.Poppins_SemiBold,
  marginBottom:hp(0.8)
},
itemsubtext:
{
  color: '#6B6B6B',
  fontSize: hp(1.6),
  fontFamily:fontFamily.Poppins_Medium,
  marginBottom:hp(0.5)
},
notetext:
{
  color: 'black',
  fontWeight: '300',
  fontSize: hp(1.8),
  width:wp(60)
},
cardrowtext:
{
  color:'#D8D8D8',
  fontWeight: '600',
  fontSize: hp(1.8),
},
itemtext:
{
  color:'white',
  fontWeight: '400',
  fontSize: hp(1.8),
},
cardtext:
{
  color:'white',
   fontFamily:'Poppins',
   fontSize:hp(2),
//marginTop:hp(1)

},

  });
  export default styles;
  