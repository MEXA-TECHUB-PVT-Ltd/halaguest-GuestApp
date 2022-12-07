import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

//////////////////app fonts////////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
    centeredView: {
        zIndex:0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
      },
      modalView: {
        width: wp(83),
        paddingTop:wp(5),
        backgroundColor: "white",
        borderRadius:wp(3),
        shadowColor: "#000",
     
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modaltext:
      { 
          fontSize:hp(2),
          color:'#303030',
          fontFamily: fontFamily.Poppins_Regular,
          textAlign:'center',
          width:wp(70)
      },
      modalsubtext:
      { 
   
          fontSize:hp(2),
          fontWeight:'400',
          color:'#535353',
          fontFamily: "Poppins",
          textAlign:'center'
      },
      ApprovedView:
      {
        height: hp(6),
        width: wp(33),
         alignSelf:'flex-end',
         alignItems:'center',
         justifyContent:'center',
         marginBottom:hp(2.5),
         marginHorizontal:wp(10),
        flexDirection:'row',
        justifyContent:'space-between'
      },
      leftbtntext:
      {
          textAlign:'left',
          color:'#6B6B6B',
          fontSize:hp(2),
          fontFamily:fontFamily.Poppins_Regular,
      },
      rightbtntext:
      {
          textAlign:'left',
          color:Colors.Appthemecolor,
          fontSize:hp(2),
          fontFamily:fontFamily.Poppins_SemiBold
      },

      maintext:{
        fontSize:hp(2),
        color:'black',
        fontFamily: fontFamily.Poppins_SemiBold,
        marginLeft:wp(4)
      },
          iconstyle:
          {
              height:hp(15),
              width:wp(22)
            },
        
  });
  export default styles;
  