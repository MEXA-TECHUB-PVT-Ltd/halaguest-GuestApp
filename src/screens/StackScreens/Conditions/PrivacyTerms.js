import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,
 View, Text, TouchableOpacity,
} from 'react-native';

/////////////////////app pakages///////////////
import { Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import SettingsMenu from '../../../components/SettingsView/SettingsMenu';
import CustomButtonhere from '../../../components/Button/CustomButton';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

/////////////////////app images/////////////////////
import { appImages } from '../../../constant/images';

const PrivacyTerms = ({ navigation,route }) => {
console.log("here are props:",route.params)
  /////////////privacyPolicy states/////////////
  const [privacyPolicy, setprivacyPolicy] = useState('');
  const GetprivacyPolicy = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'api/privacyPolicy/allprivacyPolicys',
    })
      .then(async function (response) {
        setprivacyPolicy(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  /////////////main menu status states/////////////
  const [termsAndConditions, settermsAndConditions] = useState('');
  const GettermsAndConditions = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'api/termsAndConditions/alltermsAndConditionss',
    })
      .then(async function (response) {
        settermsAndConditions(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetprivacyPolicy()
    GettermsAndConditions()
  }, []);
  return (

    <SafeAreaView style={styles.container}>
            {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        > */}
               <CustomHeader
          headerlabel={route.params.navplace=== 'Privacy'?'Privacy Policy':'Terms & Conditions'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
<View style={styles.textview}>
{
    route.params.navplace=== 'Privacy'?
    <Text style={styles.text}>{privacyPolicy}</Text>
    :
    <Text style={styles.text}>{termsAndConditions}</Text>
  }
    <Text style={styles.text}>
        {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
         tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
         vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
         no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
          duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
           Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
           elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
             Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit 
             amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
             eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
              no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
              consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
               magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et 
               ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                 ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                 dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit 
                 amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                  ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                   Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
                   ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor 
                    sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                     invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                     justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                       tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                         ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
                           et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed 
                            diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                             At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
                             takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
                              voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam 
             erat, sed diam vol ptua. At vero 
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
             ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
               et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum 
               dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
               magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
               clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit 
               amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
               aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                 erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                  gubergren, no 
        sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
         sed diam nonumy eirmod */}
    </Text>

</View>

   {/* </ScrollView> */}
    </SafeAreaView>
  )
};

export default PrivacyTerms;