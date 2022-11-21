import React from 'react';
import {
  StyleSheet,
} from 'react-native';

////////////////app colors////////////
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  ////////////////app fonts////////////
import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor:'white'
  },

  ////////////////////user image///////////////////
  userimage:
  {
      borderColor:'#AAAAAA',
      borderWidth:1,
      width:wp(30),
      height:hp(14),
borderRadius:wp(25),
//backgroundColor:'white',
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

  //////////////////////line view///////////////////
 lineview:
  {
      borderBottomColor:'#707070',
      borderBottomWidth:0.5,
      width:wp(88),
alignSelf:'center',
marginBottom:hp(6),
marginTop:hp(3)
  },

    //////////////////////user detail///////////////////
    usernametext:
    {
        width:wp(50),
        fontFamily:fontFamily.Poppins_SemiBold,
        fontSize:hp(2.5),
        color:Colors.Appthemecolor,
        textAlign:'center'
    },
 detailview:
 {
     width:wp(88),
alignSelf:'center',
marginBottom:hp(3),
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
paddingHorizontal:wp(2)
 },
 detaillefttext:
 {
     width:wp(40),
fontFamily:fontFamily.Poppins_Medium,
fontSize:hp(1.8),
color:'#000000',
 },
 detailrighttext:
 {
     width:wp(40),
textAlign:'right',
fontFamily:fontFamily.Poppins_Medium,
fontSize:hp(1.8),
color:'#6B6B6B',
 },
});
export default styles;
