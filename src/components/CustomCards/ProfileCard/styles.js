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
 width: wp(88),
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'white',
  paddingHorizontal:wp(5),
  paddingVertical:hp(3),
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
  fontSize: hp(2),
  fontFamily:fontFamily.Poppins_Medium,
  width:wp(60),
  textAlign:'center'
},
itemsubtext:
{
  color: '#303030',
  fontSize: hp(1.7),
  fontFamily:fontFamily.Poppins_Regular,
  marginBottom:hp(0.8),
  textAlign:'center'
},
itemsubdesctext:
{
  color: '#303030',
  fontSize: hp(1.4),
  fontFamily:fontFamily.Poppins_Regular,
  marginBottom:hp(0.8),
  textAlign:'center',
  width:wp(76)
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
  