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

////////////////////app pakages//////////////////
import CountryPicker from "react-native-country-picker-modal"

////////////paper papkage///////////////
import {RadioButton,Snackbar} from 'react-native-paper';

//////////////////////app components///////////////
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomHeader from '../../../components/Header/CustomHeader';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,editUserImage } from '../../../redux/actions';
////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';
import CountryPickerstyles from '../../../styles/CountryPicker/CountryPickerstyles';

/////////////////app images///////////
import { appImages } from '../../../constant/images';

const EditGuests = ({navigation,route}) => {

    /////////////////previous data state////////////////////////////////
    const [predata] = useState(route.params);

  /////////////////////////redux///////////////////
  const {phone_no,edit_user_image} =
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
  const EditGuests = async () => {
    var date = new Date();
    console.log('userid:', date, checked,phone_no,BASE_URL + 'api/driver/createDriver');
    axios({
      method: 'POST',
      url: BASE_URL + 'api/guest/updateGuest',
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
      EditGuests()
    }
  };

  /////////////////////////Get Guests Data////////////////////
  const GetGuestsDetail=async() => {
    console.log("order request function",)
    await axios({
      method: 'GET',
      url: BASE_URL+'api/guest/specificGuest/635a30db3f59fb5c0e1232bd'
      //+predata.guest_id,
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
      setName(response.data[0].img)
      setEmail(response.data[0].name)
      setChecked(response.data[0].flight_date)
      setCity(response.data[0].flight_time)
      setState(response.data[0].estimated_amount)
      setZipcode(response.data.img)
      setCountry(response.data[0].car_type_id.price)
      setStreet_address(response.data[0].total_amount)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
    useEffect(() => {
        GetGuestsDetail()
    }, []);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
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
      <CustomHeader
          headerlabel={'Add Guest'}
          iconPress={() => { navigation.goBack()}}
          icon={'chevron-back'}

        />
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() =>
                             {refRBSheet.current.open(),
                                dispatch(setNavPlace('EditGuests'))
                                }
                 }>
              <View style={styles.userimage}>
                {user_image != '' ? (
                  <Image
                    source={{uri: BASE_URL+edit_user_image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={appImages.User}
                    style={{width: wp(12), height: hp(8)}}
                    resizeMode="contain"
                  />
                )}

                <Image
                  source={appImages.Camera}
                  style={{
                    width: wp(10),
                    height: hp(5),
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <View style={Inputstyles.inputview}>
              <Text style={Inputstyles.inputtoptext}>Guest Name</Text>
                <View style={Inputstyles.action}>
                  <TextInput
                    onChangeText={setName}
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
    
              <Text style={Inputstyles.inputtoptext}>Email</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input2}
                  onChangeText={setEmail}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input3.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  keyboardType='email-address'
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Phone Number</Text>
              <View style={[Inputstyles.action,{flexDirection:'row'}]}>
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
                  style={CountryPickerstyles.codetext}
                  placeholderTextColor={"#6B6B6B"}
                />
                         <View style={CountryPickerstyles.verticallineview}></View>
            </View>
   
          </TouchableOpacity>
     <TextInput
       onChangeText={setnumber}
       autoCapitalize="none"
       keyboardType='number-pad'
       placeholderTextColor={Colors.inputtextcolor}
       style={[Inputstyles.input,{width:wp(62)}]}
     />
   </View>
              {/* <TouchableOpacity onPress={()=> refddRBSheet.current.open()} >
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input2}
                  value={dispatcher}
                  //onChangeText={setEmail}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input3.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
              
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity> */}
              <Text style={Inputstyles.inputtoptext}>City</Text>
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
              <Text style={Inputstyles.inputtoptext}>State</Text>
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
              <Text style={Inputstyles.inputtoptext}>Zip_Code</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input5}
                  onChangeText={setZipcode}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input6.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Country</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input6}
                  onChangeText={setCountry}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input7.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Street Address</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input7}
                  onChangeText={setStreet_address}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Gender</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(12),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    value="male"
                    status={checked === 'male' ? 'checked' : 'unchecked'}
                    color={Colors.Appthemecolor}
                    uncheckedColor={Colors.Appthemecolor}
                    onPress={() => setChecked('male')}
                  />
                  <Text style={Inputstyles.inputtoptext}>Male</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    value="female"
                    status={checked === 'female' ? 'checked' : 'unchecked'}
                    color={Colors.Appthemecolor}
                    uncheckedColor={Colors.Appthemecolor}
                    onPress={() => setChecked('female')}
                  />
                  <Text style={Inputstyles.inputtoptext}>Female</Text>
                </View>
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

export default EditGuests;
