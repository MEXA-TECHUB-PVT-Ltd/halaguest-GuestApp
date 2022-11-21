import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image} from 'react-native';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Logostyles from '../../styles/GlobalStyles/Logostyles';

/////////////////app images/////////////////////
import { appImages } from '../../constant/images';

const CustomModal = (props) => {

    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView,{alignItems:'center'}]}>
            <Image
                  source={props.Icon}
                  style={styles.iconstyle}
                  resizeMode='contain'
                />
  
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View>
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),
              alignSelf:'center'}}>
                       <Text style={styles.modalsubtext}>
                            {props.subtext}</Text>
              </View>

    <View  style={styles.ApprovedView}>
        <TouchableOpacity 
        onPress={props.CloseModal}>
        <Text style={styles.leftbtntext}>{props.leftbuttontext}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={props.onPress}>
        <Text style={styles.rightbtntext}>{props.rightbuttontext}</Text>
        </TouchableOpacity>
    </View>

            </View>
          </View>
        </Modal>

    )
};

export default CustomModal;