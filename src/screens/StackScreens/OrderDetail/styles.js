import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';

//////////////////app color//////////////////
import Colors from '../../../utills/Colors';

//////////////////app styles///////////////
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////appp fonts////////////////////
import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
    container:
    {
flex:1,
backgroundColor:'white',

},
ordertopview:
{
    alignItems:'center',
    justifyContent:'center',
    marginTop:hp(3),
    marginBottom:hp(3)
},
ordertoptext:
{
fontFamily:fontFamily.Poppins_SemiBold,
fontSize:hp(3),
color:Colors.Appthemeorangecolor
},
userdetail:
{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'
},
usernametext:
{
fontFamily:fontFamily.Poppins_SemiBold,
fontSize:hp(1.8),
color:'#303030',
marginLeft:wp(2)
},
status:
{
    width:wp(25),
    height:hp(5),
    backgroundColor:'#00D640',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp(2)
},
statustext:
{
color:'white',
fontSize:hp(1.5),
fontFamily:fontFamily.Poppins_Regular
},

detailview:
{
    width: wp(90),
flexDirection:'row',
marginTop:hp(1),
justifyContent:'space-between',
alignItems:'center',
alignContent:'center',
alignSelf:'center'
},
lineview:
{
    width: wp(90),
flexDirection:'row',
marginTop:hp(1),
borderBottomColor:'#DCDCDC',
borderBottomWidth:0.8
},
detailtextleft:
{
    //backgroundColor:'red',
    width: wp('45%'),
    color:Colors.Appthemecolor,
    fontFamily:fontFamily.Poppins_SemiBold,
fontSize: hp(1.8),
marginBottom:hp(1),
justifyContent:'center'
},
detailtextright:
{
    //backgroundColor:'red',
    width: wp('40%'),
    color:'#2E383F',
    fontFamily: fontFamily.Poppins_Medium,
fontSize: hp('1.8%'),
textAlign:'right',
justifyContent:'center',
marginBottom:'4%'
},
notesmaintext:
{
     //backgroundColor:'green',
     width: wp('80%'),
    marginTop:'5%',
    marginBottom:'2%',
    color:'#2E383F',
    fontFamily: "Quicksand",
fontWeight:'700',
fontSize:hp('1.6%'),
},
notestext:{
    color:'#6B6B6B',
    textAlign:'justify',
    fontFamily:fontFamily.Poppins_Regular,
    fontSize:hp(1.6)
},
subtext:
{
     //backgroundColor:'red',
     width: wp('70%'),
    //marginTop:10,
    marginLeft:18,
    color:'#8F8F8F',
    fontFamily: fontFamily.Poppins_Medium,
fontSize:hp(1.5),
},



  });
  export default styles;