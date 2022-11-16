import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
 Menu,
 MenuProvider,
 MenuOptions,
 MenuTrigger,
} from "react-native-popup-menu";

///////////////////app icons////////////////////////
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
 Block,
 Mute,

} from "./CustomMenuContents";

////////////paper papkage///////////////
import {Divider} from 'react-native-paper';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";

//const Divider = () => <View style={styles.divider} />;
const CustomMenu = () => {
 return (
   <MenuProvider style={styles.container}>
     <Menu>
       <MenuTrigger
         customStyles={{
           triggerWrapper: {
             top: -20,
           },
         }}
       >
         <Ionicons name="ellipsis-vertical-sharp" size={24} color="black" />
       </MenuTrigger>
       <MenuOptions
         customStyles={{
           optionsContainer: {
             borderRadius: 10,
             width:wp(40),
             height:hp(18),
             alignItems:'center',
             justifyContent:'center'
           },
         }}
       >
         <Block text="Edit" value="edit" iconName="edit" />
         <Divider />
         <Mute text="Delete" value="delete" iconName="delete" />
   
       </MenuOptions>
     </Menu>
   </MenuProvider>
 );
};

export default CustomMenu;

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   marginVertical: 100,
   marginHorizontal: 100,
 },
 divider: {
   height: StyleSheet.hairlineWidth,
   backgroundColor: "#7F8487",
 },
});