import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  /////////////app fonts//////////
  import { fontFamily } from '../../constant/fonts';

const Multilineinputstyles = StyleSheet.create({

    inputview:
    {
      width: wp('85%'),
      height:wp('50%'),
      alignSelf: 'center',
      alignContent:"center",
      marginTop:wp('10%'),
      // /backgroundColor:'red'
    },
  
  
    input:
    { 
        height:wp('30%'),
        width:wp('72%'), 
        textAlignVertical: 'top',
        color: 'black' ,
        fontFamily:fontFamily.Lato_Regular
    //backgroundColor:'red'
    },
    action: {
  
      backgroundColor: Colors.appinputscolor,
      width: wp(88),
      height: wp(30),
      alignSelf: 'center',
      marginBottom: wp('2%'),
      alignItems: 'center',
      paddingTop: wp('3%'),
      paddingLeft: wp('5%'),
      paddingRight: wp('5%'),
      borderRadius:30
    },

});
export default Multilineinputstyles;
