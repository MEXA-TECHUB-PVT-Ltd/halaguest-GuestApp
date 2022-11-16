import React from 'react';
import {
  StyleSheet,

} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  import { fontFamily } from '../../constant/fonts';

const Inputstyles = StyleSheet.create({

  inputview:
  {
    width: wp(100),
    alignSelf: 'center',
    alignContent:"center",
    justifyContent:'center',

  },
  input:
  {
    //backgroundColor: Colors.appinputscolor,
     width: '88%', 
     alignSelf: 'center', 
     color: 'black' ,
    borderRadius: 40,
    //fontWeight:'400',
    paddingLeft:wp(4),
    fontFamily:fontFamily.Lato_Regular
  },
  action: {
    flexDirection: 'row',
    marginTop:wp(2),
    marginBottom: wp(2),
    backgroundColor: Colors.appinputscolor,
    width: wp(88),
    height: wp(15),
    alignSelf: 'center',
    borderRadius: wp(5),
    paddingLeft: wp(2),
    alignItems: 'center'
  },
inputtoptext:
{
  color:Colors.inputtoptext,
  fontSize:hp(1.8),
  fontFamily:fontFamily.Poppins_Regular,
  marginLeft:wp(8),
  marginBottom:wp(2),
  marginTop:wp(4),
}



});
export default Inputstyles;
