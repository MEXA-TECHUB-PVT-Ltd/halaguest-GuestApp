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
    backgroundColor: 'white'
  },
  Logoview:
  {
      alignItems:"center",
      marginTop:hp(5),
      marginBottom:hp(0)
},
  logo:
  {
      height:hp(20),
      width:wp(30)
    },
  textview:
  {
   marginHorizontal:wp(6),
   marginTop:hp(0),
marginBottom:hp(2),
alignItems:'center'
   },
  toptext:
  {
    color: Colors.BottomTabcolor,
    fontSize: hp(2.5),
    fontFamily:fontFamily.Poppins_SemiBold
   
  },
  hoteltext:
  {
    color: '#000000',
    fontSize: hp(1.8),
    fontFamily:fontFamily.Poppins_Regular,
    marginLeft:wp(3)
   
  },
  imageview:
  { 
    flex: 0.2,
       justifyContent: 'flex-end',
       alignItems:'center'
//backgroundColor:"red"
},
image: {
  height:60,
  width:110,
},
  balancetext:
  {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('3%'),
  },


  usertext:
  {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('2%'),
  },

  itemtext:
  {
    color: 'black',
    fontWeight: '300',
    fontSize: hp('1.5%'),
  },
  inputflex:
  {
    
   // flex:0.3,
    justifyContent:'center',
    alignItems:'center',
    marginTop:wp('10%')
          //backgroundColor:'green'
          },
          inputeditable:{
            //marginTop:13,
            backgroundColor:'white',
            width: wp('84%'),
            marginLeft:'3%',
            fontSize:hp('1.5%'),
            fontWeight:'bold',
            color:'black',
        },
        buttonview:
        { 
            //flex: 0.2, 
            justifyContent: 'center',
        //backgroundColor:'yellow',
        marginTop:wp('60%')
            },
            detailtext:
{
    //backgroundColor:'red',
    width: wp('45%'),
    color:Colors.Appthemecolor,
    fontFamily:fontFamily.Poppins_Medium,
fontSize: hp(1.8),
marginBottom:hp(1),
justifyContent:'center',
marginLeft:wp(5),
marginTop:hp(2)
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
borderBottomWidth:0.8,
alignSelf:'center'
},
detailtextright:
{
    //backgroundColor:'red',
    width: wp('45%'),
    color:Colors.Appthemecolor,
    fontFamily:fontFamily.Poppins_SemiBold,
fontSize: hp(1.8),
marginBottom:hp(1),
justifyContent:'center',
textAlign:'right',
},
 detailtextleft:
{
    //backgroundColor:'red',
    width: wp('40%'),
    color:'#2E383F',
    fontFamily: fontFamily.Poppins_Medium,
fontSize: hp('1.8%'),

justifyContent:'center',
marginBottom:'4%'
},
});
export default styles;