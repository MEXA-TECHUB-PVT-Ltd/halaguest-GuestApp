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
 width: wp(93),
  alignSelf:'center',
  backgroundColor:Colors.cardcolor,
  paddingHorizontal:wp(5),
  paddingVertical:hp(2),
},
  topview:
  {
      borderBottomWidth:2,
      borderBottomColor:'#707070',
      flexDirection:'row',
    width:wp(83),
    paddingBottom:hp(2),
    justifyContent:'space-between'
},
useritemtext:
{
  color: 'white',
  fontWeight: '600',
  fontSize: hp(2),
},
notetext:
{
  color: 'white',
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
  