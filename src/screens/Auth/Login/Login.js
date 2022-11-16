import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,TextInput,
  Image, View, Text, TouchableOpacity, Button,StatusBar
} from 'react-native';

////////////paper papkage///////////////
import { Checkbox } from 'react-native-paper';

///////////////////app components////////////////
import CustomButtonhere from '../../../components/Button/CustomButton';

///////////contry picker package///////////
import CountryPicker from "react-native-country-picker-modal"

/////////////app icons////////////////
import Icon from 'react-native-vector-icons/MaterialIcons';

//////////////////app styles///////////
import styles from './styles';
import Authtextstyles from '../../../styles/GlobalStyles/Authtextstyles';
import Logostyles from '../../../styles/GlobalStyles/Logostyles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setPhoneNumber } from '../../../redux/actions';

/////////////////////app images///////////////////
import { appImages } from '../../../constant/images';

const Login = ({ navigation }) => {

    /////////////redux states///////
    const { HotelTypes} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  ///////////////////checkbox state///////////////////
  const [checked, setChecked] = React.useState(false);

    /////////////country picker states////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState('92');
  const [Phoneno, setPhoneno] = useState('92');
  const [number, setnumber] = useState();

  useEffect(() => {

  }, []);

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
                  style={{ fontSize: 15, fontWeight: '500',
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
       style={{ width: '80%', marginLeft: 10, alignSelf: 'center', color: '#000' }}
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
            topDistance={28}
            onPress={() => 
             {
              dispatch(setPhoneNumber(number)),
              //navigation.navigate('Verification',{Phonenumber:number})}
              navigation.navigate('Verification')}
            }
          />
                     {/* <View style={Authlaststyles.lasttextview}>
        <Text style={Authlaststyles.lasttext}>Don't have an account? </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Signup')}>
        <Text style={Authlaststyles.lasttext}>Sign Up</Text>
        </TouchableOpacity>
      </View> */}

    </SafeAreaView>
  )
};

export default Login;