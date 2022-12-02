import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts//////////////
import { fontFamily } from '../../../../constant/fonts';

const styles = StyleSheet.create({
    container: {
      flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
        height:hp(100),
        width:wp(100),
        zIndex: 10
      },
      mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
        searchBox: {
          position:'absolute', 
          marginTop: Platform.OS === 'ios' ? 40 : 20, 
          flexDirection:"row",
          backgroundColor: '#fff',
          width: wp(90),
          height:hp(10),
          alignSelf:'center',
          borderRadius: 5,
          padding: 10,
          shadowColor: '#ccc',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
        },
        lastView: {
          position: "absolute",
          flexDirection:'row',
          bottom: 0,
          left: 0,
          right: 0,
         // height:hp(25),
          //width:wp(100),
          //backgroundColor:'white',
        },
        marker: {
          width: 30,
          height: 30,
        },
        drivertext:
{
    fontSize:hp(1.6),
    color:Colors.Appthemecolor,
    fontFamily:fontFamily.Poppins_Medium,
    marginLeft:wp(3)
},
vehicletext:
{
    fontSize:hp(1.6),
    color:'#797979',
    fontFamily:fontFamily.Poppins_Regular,
    marginLeft:wp(3)
},
        trackbtn:
{ 
    width:wp(25),
    height:hp(5),
    backgroundColor:'#4D419E',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp(3),
},
tracktext:
{
    fontSize:hp(1.6),
    color:'white',
    fontFamily:fontFamily.Poppins_Regular
},
tripbtn:
{ 
    width:wp(35),
    height:hp(6),
    backgroundColor:Colors.Appthemeorangecolor,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp(3),
    flexDirection:'row'
},
triptext:
{
    fontSize:hp(1.6),
    color:'white',
    fontFamily:fontFamily.Poppins_Regular,
    marginLeft:wp(3)
},
image: {
    height:wp(14),
    width:wp(14),
borderRadius:80,
  },
  canceltext:
{
    fontSize:hp(1.6),
    color:'#797979',
    fontFamily:fontFamily.Poppins_Medium,

},


/////////////////route/////////////////
container1:
{
flex:1,
backgroundColor:'white',
},
// container: {
// marginTop:'25%',
// ...StyleSheet.absoluteFillObject,
// height: hp('85%'),
// width: wp(100),
// justifyContent: 'flex-end',
// alignItems: 'center',
// backgroundColor: 'white',
// },
map: {
...StyleSheet.absoluteFillObject,
//position:'absolute',
//backgroundColor:'white'
},
  });
  export default styles;
  