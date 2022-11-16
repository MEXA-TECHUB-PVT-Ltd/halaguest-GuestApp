import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';

/////////////app styles////////////////
import Colors from '../../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

//////////////app fonts/////////////
import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
    container:
    {
flex:1,
backgroundColor:'white',
paddingHorizontal:'5%',
paddingVertical:'5%',
},

countrypicker:
{
    flexDirection:'row',
    marginLeft:wp(5),
    marginRight:wp(5)
            },

inputeditable:{
    // /marginTop:'5%',
    backgroundColor:'white',
    width: wp('64%'),
    marginLeft:'3%',
    fontSize:hp('1.5%'),
    fontWeight:'bold',
    color:'black',
},
buttonview:
{
    flex:1,
    marginTop:hp('20%'),
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    //borderWidth:1,
    //borderColor: Colors.,
    paddingBottom: 5,
    backgroundColor: Colors.authinputs,
    width: wp(85),
    height: wp(15),
    alignSelf: 'center',
    marginBottom: wp('2%'),
    borderRadius: wp(5),
    paddingLeft: wp('2%'),
    alignItems: 'center'
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: Colors.Appthemecolor,
  },
  greytext:
  {
    fontFamily:fontFamily.Poppins_Regular,
    fontSize:hp(1.5),
    color: '#585858',
    width:wp(75),
    marginLeft:wp(5)
  },
  bluetext:
  {
    fontFamily:fontFamily.Poppins_SemiBold,
    fontSize:hp(1.6),
    color: '#3590C4'
  }
  });
  export default styles;