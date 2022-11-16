import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
import { fontFamily } from '../../../constant/fonts';


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
backgroundColor:"white"
  },
  image: {
    height:hp(25),
    width:wp(65),
  },

  buttonview:
  { 

      justifyContent: 'center',
marginTop:hp(25)
      },
      Cellview:{
        marginBottom:10,
        marginTop:10,
        paddingHorizontal:wp(5)
      },
      root: {
        //flex: 1, 
        padding: 0
      },
      title: {
        textAlign: 'center', 
      fontSize:hp(3),
      justifyContent:'center',
      alignItems:'center',
      color:Colors.Appthemecolor
      },
      codeFieldRoot: 
      {
      marginTop: 10,
      
      },
      cell: {
      //paddingVertical:0,
      //paddingBottom:2,
      marginTop:10,
      width: wp(14),
      height: hp(7),
      lineHeight: hp(6.5),
      fontSize:hp(2.5),
      color:'gray',
      textAlign: 'center',
      alignItems:'center',
      backgroundColor: '#E1E1E14F',
      justifyContent:'center',  
      borderRadius:wp(4)
      },
      focusCell: {
      //borderColor: 'gray',
      alignItems:'center',
      textAlign: 'center',
      //margin:10,
      justifyContent:'center',
      backgroundColor:Colors.authinputs,
      color:Colors.Appthemecolor,
      },
      Cellmaintext:
      {
        color:Colors.Appthemecolor,
      textAlign:'center',
fontFamily:fontFamily.Poppins_Medium,
fontSize:hp(1.8)
      },
});
export default styles;
