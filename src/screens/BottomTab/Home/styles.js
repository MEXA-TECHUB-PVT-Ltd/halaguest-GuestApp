import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  ///////////////////app fonts///////////
  import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
backgroundColor:'white'
  },

createtripbtn:
{
  position:'absolute',
bottom:hp(4),
height:hp(7),
width:wp(45),
alignItems:'center',
justifyContent:'center',
alignSelf:'center',
borderRadius:wp(3),
backgroundColor:Colors.BottomTabcolor,
shadowColor: "#000",
shadowOffset: {
    width: 0,
    height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
},
createtriptext:
{
  color:'white',
fontFamily:fontFamily.Poppins_Regular,
fontSize:hp(2.2)
},
mapStyle: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
locview:
{ 
  borderBottomColor:Colors.border,
borderBottomWidth:1,
backgroundColor:'white',
paddingVertical:hp(0.6),
paddingBottom:hp(0.2),
//height:wp(15),
width:wp(100),
paddingHorizontal:wp(5),
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
loctext:
{
  color:Colors.BottomTabcolor,
  marginLeft:wp(3),
  fontFamily:fontFamily.Poppins_Medium,
fontSize:hp(1.6),
width:wp(80),
},
});
export default styles;
