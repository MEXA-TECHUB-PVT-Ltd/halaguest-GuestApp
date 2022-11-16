import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image,TouchableOpacity } from 'react-native';

/////////////app icons/////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////app styles//////////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Inputstyles from '../../styles/GlobalStyles/Inputstyles';

//////////////app images/////////
import { appImages } from '../../constant/images';

////////////////app redux///////////
import { useSelector } from 'react-redux';

const SettingsMenu = ({ navigation,label,labelPress,icon}) => {
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (

       <TouchableOpacity onPress={labelPress}
       style={styles.mainview}
       >
          <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:hp(0),
        width:wp(75)}}>
          <Text style={styles.labeltext}>{label}</Text>
        <Ionicons
          name='chevron-forward'
          color={'#9F9F9F'}
          size={22}
          onPress={labelPress}

        />
          </View>
          </TouchableOpacity>

  );
};

export default SettingsMenu;