import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,TextInput,
  Image, View, Text, TouchableOpacity,StatusBar
} from 'react-native';

////////////paper papkage///////////////
import { Checkbox,Snackbar } from 'react-native-paper';

///////////////////app components////////////////
import CustomButtonhere from '../../../components/Button/CustomButton';

/////////////////country picker/////////////
import CountryPicker from "react-native-country-picker-modal"

//////////////////app styles///////////
import styles from './styles';
import Authtextstyles from '../../../styles/GlobalStyles/Authtextstyles';
import Logostyles from '../../../styles/GlobalStyles/Logostyles';
import Colors from '../../../utills/Colors';

/////////////////////app images///////////////////
import { appImages } from '../../../constant/images';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';

const Login = ({ navigation }) => {

    ///////////////////checkbox state///////////////////
    const [checked, setChecked] = React.useState(false);

       /////////button states/////////////
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

    ///////////////country picker states//////////////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState('968');
  const [number, setnumber] = useState('');

  //////////////////////// API forms validations////////////////////////
  const LoginValidation = async () => {
    // input validation
    if (number == '') {
      setsnackbarValue({value: 'Please Enter Phone Number', color: 'red'});
      setVisible('true');
    } 
   else if (checked == false) {
      setsnackbarValue({value: 'Please Checked the Terms and Condition', color: 'red'});
      setVisible('true');
    } 
    else {
      SendSms()
      //navigation.navigate('Verification',{Phonenumber:countryCode+number})
    }
  };
  //////////////////////Api Calling Login/////////////////
  const SendSms = async () => {
    console.log("number here:",'+' + countryCode + number,BASE_URL + 'api/sms/createOTP')
    axios({
      method: 'POST',
      url: BASE_URL + 'api/sms/createOTP',
      data: {
        toContact: '+' + countryCode + number,
      },
    })
      .then(async function (response) {
        console.log("response here:",response.data)
        navigation.navigate('Verification', {
          Phonenumber: countryCode + number,
          code: response.data.otp,
        });
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  return (

    <SafeAreaView style={styles.container}> 
      <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        {CountryPickerView == true ? <CountryPicker
          withFilter={true}
          withCallingCode={true}
          withModal={true}
          withFlag={true}
          withFlagButton={true}

          onSelect={(e) => {
            setCountryPickerView(false)
            //setCountryFlag(JSON.parse(e.flag))
            setCountryCode(JSON.parse(e.callingCode))
          }}
          onClose={(e) => {
            setCountryPickerView(false)
          }}
          visible={CountryPickerView}
        /> :
          <View></View>
        }
        <View 
     style={[Logostyles.Logoview]}
        >
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode='contain'
          />
        </View>
<View style={Authtextstyles.textview}>
            <Text style={Authtextstyles.toptext}>Sign In</Text>
            <Text style={Authtextstyles.subtext}>Please enter your phone number
            </Text>
          </View>

<View style={[styles.action,{flexDirection:'row'}]}>
          <TouchableOpacity
            onPress={() => {
              setCountryPickerView(true)
            }}>
            <View style={styles.countrypicker}>
                <TextInput
                  underlineColor={'white'}
                  activeUnderlineColor={'white'}
                  //style={styles.input}
                  editable={false}
                  value={'+'+countryCode}
                  style={{ fontSize: hp(2), fontWeight: '500',
                   color: Colors.Appthemecolor,padding:'0.3%' }}
                  placeholderTextColor={"black"}
                />
            </View>
          </TouchableOpacity>
     <TextInput
       placeholder="000000000"
       onChangeText={setnumber}
       placeholderTextColor={Colors.Appthemecolor}
       autoCapitalize="none"
       keyboardType='number-pad'
       style={{ width: '80%', marginLeft:wp(3), alignSelf: 'center', color: '#000' }}
     />
   </View>
   <View style={{flexDirection:"row",alignItems:'center',marginTop:hp(2)}}>
   <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      color={Colors.Appthemecolor}
      uncheckedColor={Colors.Appthemecolor}
      onPress={() => {
        setChecked(!checked);
      }}
    />
   <Text style={styles.greytext}>
{'By continuing, I confirm I have read the '}  
    <Text style={styles.bluetext}> 
      Terms & Condition
    </Text>

</Text>
   </View>

        <CustomButtonhere
            title={'SIGN IN'}
            widthset={78}
            topDistance={30}
            onPress={() => 
             {
              //signInWithPhoneNumber('+'+countryCode+number)
              LoginValidation()
            }
            }
          />
                     {/* <View style={Authlaststyles.lasttextview}>
        <Text style={Authlaststyles.lasttext}>Don't have an account? </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Signup')}>
        <Text style={Authlaststyles.lasttext}>Sign Up</Text>
        </TouchableOpacity>
      </View> */}
              <Snackbar
          duration={500}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom:hp(15),
            zIndex: 999,
            alignSelf:"center",
            marginLeft:wp(15)
          }}>
          {snackbarValue.value}
        </Snackbar>
    </SafeAreaView>
  )
};

export default Login;