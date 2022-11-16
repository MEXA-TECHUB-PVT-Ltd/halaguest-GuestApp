import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image,TouchableOpacity } from 'react-native';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

//////////////app images/////////
import { appImages } from '../../constant/images';

////////////////app fonts////////
import { fontFamily } from '../../constant/fonts';

////////////////app redux///////////
import { useSelector } from 'react-redux';

const ViewAll = ({ navigation, headerlabel,onpress}) => {
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (
    <TouchableOpacity style={[style.headerView]}
    onPress={onpress}
    >
                  <Text style={style.leftlabeltext}>{headerlabel}</Text>
                  <Text style={style.rightlabeltext}>See All</Text>
                  </TouchableOpacity>

  );

};
const style = StyleSheet.create({
    headerView: {
        width:wp(100),
        height:hp(10),
      alignItems: 'center',
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:'white',
     paddingHorizontal:wp(5),
    // / marginTop:hp(3)
    },

      leftlabeltext:
{ 
    color: '#303030',
     fontSize: hp(1.8), 
     fontFamily:fontFamily.Poppins_Medium,
     marginBottom:wp(1)
    },
    rightlabeltext:
    { 
        color:Colors.BottomTabcolor,
         fontSize: hp(1.5), 
         fontFamily:fontFamily.Poppins_Medium,
        }
  });
export default ViewAll;