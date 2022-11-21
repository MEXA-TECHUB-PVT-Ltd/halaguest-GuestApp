// CustomContents.js 

import React, {useEffect, useState, useRef} from 'react';
import { MenuOption } from "react-native-popup-menu";
import { Text } from "react-native";

///////////////////app icons////////////////////////
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////app styles///////////////////
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './styles';

//////////////////app fonts////////////
import { fontFamily } from '../../constant/fonts';

export const Block = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal:wp(5),
     },
   }}
 >
     <FontAwesome name={iconName} size={30} color="#6B6B6B" />
   <Text style={styles.menuoptiontext}>{text}</Text>
 </MenuOption>
);

export const Mute = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       paddingHorizontal:wp(5),
     },
   }}
 >
     <MaterialCommunityIcons name={iconName} size={30} color="#6B6B6B" />
   <Text>{text}</Text>

 </MenuOption>
);




