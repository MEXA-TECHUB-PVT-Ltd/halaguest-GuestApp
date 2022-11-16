import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

////////////paper papkage///////////////
import {RadioButton,Snackbar} from 'react-native-paper';

//////////////////////app components///////////////
import CamerBottomSheet from '../../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../../components/Button/CustomButton';
import CustomHeader from '../../../../components/Header/CustomHeader';
import SettingsMenu from '../../../../components/SettingsView/SettingsMenu';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace } from '../../../../redux/actions';
////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import Inputstyles from '../../../../styles/GlobalStyles/Inputstyles';
import CountryPickerstyles from '../../../../styles/CountryPicker/CountryPickerstyles';

/////////////////app images///////////
import { appImages } from '../../../../constant/images';

const CreateTrip = ({navigation}) => {

  /////////////////////////redux///////////////////

  const {phone_no,user_image} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

      /////////////country picker states////////////
      const [CountryPickerView, setCountryPickerView] = useState(false);
      const [countryCode, setCountryCode] = useState('92');
      const [Phoneno, setPhoneno] = useState('92');
      const [number, setnumber] = useState();

  ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('male');

  //////////////link dropdown////////////////
  const refddRBSheet = useRef();
  
  //camera and imagepicker
  const refRBSheet = useRef();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

   /////////button states/////////////
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

  ///////////////API data states////////////////////
  //////////////////Account////////////////
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] =useState('');
  const [street_address, setStreet_address] = useState('');

 ///////////email//////////////////
 const handleValidEmail = (val) => {
  let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
  if (reg.test(val)) {
      console.log('true')
      return true;
  }
  else {
      console.log('falsse')
      return false;
  }
}

  //////////////////////Api Calling/////////////////
  const CreateGuests = async () => {
    var date = new Date();
    console.log('userid:', date, checked,phone_no,BASE_URL + 'api/driver/createDriver');

    axios({
      method: 'POST',
      url: BASE_URL + 'api/guest/createGuest',
      data: {
       img: user_image,
        email: email,
        gender:checked,
        city: city,
        state: state,
        zip_code: zipcode,
        country: country,
        street_address: street_address,
        name: name,
        phoneNo: phone_no,
        created_at: date,
        hotel_id:'635b84dc4f7c2392c3abbd1a',
        status: 'block',
        device_token: '354ref',
        driver_location: 'Pir Mehr Ali Shah Arid Agriculture University - PMAS AAUR, Shamsabad, Muree، Road, Punjab، Rawalpindi, 46000',
        driver_lat: '33.601920',
        driver_log: '73.038080' 
      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
            setloading(0);
          setdisable(0);
 
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {}, []);

  //////////////////////// API forms validations////////////////////////
  const AcountValidation = async () => {
    // input validation
    if (name == '') {
      setsnackbarValue({value: 'Please Enter Username', color: 'red'});
      setVisible('true');
    } else if (email == '') {
      setsnackbarValue({value: 'Please Enter Email', color: 'red'});
      setVisible('true');
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({value: 'Incorrect Email', color: 'red'});
      setVisible('true');
    } else if (city == '') {
      setsnackbarValue({value: 'Please Enter City', color: 'red'});
      setVisible('true');
    } 
    else if (state == '') {
      setsnackbarValue({value: 'Please Enter State', color: 'red'});
      setVisible('true');
    }
    else if (zipcode == '') {
      setsnackbarValue({value: 'Please Enter Zipcode', color: 'red'});
      setVisible('true');
    }
    else if (country == '') {
      setsnackbarValue({value: 'Please Enter Country', color: 'red'});
      setVisible('true');
    }
    else if (street_address == '') {
      setsnackbarValue({value: 'Please Enter Street Address', color: 'red'});
      setVisible('true');
    }
    else {
      setloading(1);
      setdisable(1);
      CreateGuests()
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
      <CustomHeader
          headerlabel={'Create Trip'}
          iconPress={() => { navigation.goBack()}}
          icon={'chevron-back'}

        />
          <View style={{flex: 1}}>
   
            <View style={Inputstyles.inputview}>
            <SettingsMenu
       label={'Add Guest'}
       labelPress={()=>navigation.navigate('GuestList')}
       />
              <Text style={Inputstyles.inputtoptext}>Enter Location</Text>
                <View style={Inputstyles.action}>
                  <TextInput
                    onChangeText={setName}
                    placeholder={'Pickup location'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholderTextColor={Colors.inputtextcolor}
                    style={Inputstyles.input}
                  />
                </View>
                <View style={Inputstyles.action}>
                  <TextInput
                    onChangeText={setName}
                    placeholder={'Drop-off location'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholderTextColor={Colors.inputtextcolor}
                    style={Inputstyles.input}
                  />
                </View>
              <Text style={Inputstyles.inputtoptext}>Select Car</Text>
              <SettingsMenu
       label={'Car Condition'}
       labelPress={()=>navigation.navigate('GuestList')}
       />
                  <SettingsMenu
       label={'Car Type'}
       labelPress={()=>navigation.navigate('GuestList')}
       />
                  <SettingsMenu
       label={'AC'}
       labelPress={()=>navigation.navigate('GuestList')}
       />

              <Text style={Inputstyles.inputtoptext}>Date of Flight</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input3}
                  onChangeText={setCity}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input4.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Time of Flight</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input4}
                  onChangeText={setState}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input5.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>

              <Text style={Inputstyles.inputtoptext}>Driver Notes</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input7}
                  onChangeText={setStreet_address}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              </View>
            <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
              <CustomButtonhere
                title={'ADD'}
                widthset={'78%'}
                topDistance={0}
                loading={loading}
                disabled={disable}
                onPress={
                  () => AcountValidation()
                  // navigation.navigate('Drawerroute')
                }
              />
            </View>
          </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}

        />
                <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom:'20%',
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>

      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateTrip;
