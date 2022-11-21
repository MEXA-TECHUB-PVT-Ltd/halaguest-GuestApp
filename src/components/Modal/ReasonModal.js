import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image,TextInput} from 'react-native';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Logostyles from '../../styles/GlobalStyles/Logostyles';
import Multilineinputstyles from '../../styles/GlobalStyles/Multilineinputstyle';

import Colors from '../../utills/Colors';

/////////////////app images/////////////////////
import { appImages } from '../../constant/images';

const ReasonModal = (props) => {

    return(
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.maintext}>
                            Add reason</Text>
  
              {/* <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),marginTop:hp(3),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View> */}
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(2),
              alignSelf:'center'}}>
      <View style={[Multilineinputstyles.action, { height: wp('38%'), marginTop: wp('3%'),width:wp(75),backgroundColor:'white',
      borderColor:Colors.border,borderWidth:1
     }]}>
            <TextInput
              // ref={ref_input6}
              placeholder="Add Reason"
              //onChangeText={setReach}
              placeholderTextColor={Colors.inputtextcolor}
              multiline={true}

              style={Multilineinputstyles.input}
            />

          </View>
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

export default ReasonModal;