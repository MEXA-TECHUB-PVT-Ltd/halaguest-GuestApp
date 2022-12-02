import React, { useEffect, useState, useRef } from 'react';
import {
 StatusBar,SafeAreaView,ScrollView,
    Image, View, Text, TouchableOpacity, TextInput
} from 'react-native';

////////////paper papkage///////////////
import {Snackbar,RadioButton} from 'react-native-paper';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';

/////////////custom dropdowns////////
import HotelTypes from '../../../components/Dropdowns/HotelTypes';
import CountryDropDown from '../../../components/Dropdowns/Location/Country';
import CityDropDown from '../../../components/Dropdowns/Location/City';
import StateDropDown from '../../../components/Dropdowns/Location/State';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setNavPlace } from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';
import Multilineinputstyles from '../../../styles/GlobalStyles/Multilineinputstyle';

/////////////////app images///////////
import { appImages } from '../../../constant/images';

////////////token api///////////////
import { checkPermission } from '../../../api/FCMToken';


const CreateAccount = ({ navigation,route }) => {

  const [maxheight, setHeight] = useState(52)

    ////////////prevous data States///////////////
    const [predata] = useState(route.params);

      ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('male');

      /////////////////////////redux///////////////////
      const { hoteltype,login_user_id, phone_no,user_image ,country_name,state_name,city_name,hoteltype_id } =
      useSelector(state => state.userReducer);
     const dispatch = useDispatch();

   //////////////link dropdown////////////////
   const refddRBSheet = useRef();
   const refCountryddRBSheet=useRef();
   const refStateddRBSheet=useRef();
   const refCityddRBSheet=useRef();

    //camera and imagepicker
  const refRBSheet = useRef();

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

       /////////button states/////////////
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

  ///////////////data states////////////////////
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [zipcode,  setZipcode] = React.useState();
  const [street_address,  setStreet_address] = React.useState();
  const [details,  setDetails] = React.useState();
  const[FCMToken,setFCMToken]=useState()
 //////////////////////Api Calling/////////////////
 const CreateAcount = async() => {
  var user= await AsyncStorage.getItem('Userid')
  var date=new Date()
  console.log("userid:",date)
    axios({
      method: 'PUT',
      url: BASE_URL + 'api/guest/updateGuest',
      data: {
        hotel_id: hoteltype_id,
        _id:login_user_id,
        img: user_image,
        email: email,
        gender:checked,
        country: country_name,
        city: city_name===''?state_name:city_name,
        state: state_name,
        zip_code: zipcode,
        street_address: street_address,
        name: name,
        phoneNo: phone_no,
        details: details,
        created_at: date,
        status: 'unblock',
        device_token: FCMToken
      },
    })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data))
        setloading(0);
        setdisable(0);
        //await AsyncStorage.setItem('Userid',response.data._id);
        setModalVisible(true)


      })
      .catch(function (error) {
        console.log("error", error)
      })
  }

    useEffect(() => {
      checkPermission().then(result => {
        setFCMToken(result)
        //do something with the result
      })
    }, []);
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
    }   else if (hoteltype_id == '') {
      setsnackbarValue({value: 'Please Enter Hotel', color: 'red'});
      setVisible('true');
    }  else if (country_name == '') {
      setsnackbarValue({value: 'Please Enter Country', color: 'red'});
      setVisible('true');
    }    else if (state_name == '') {
      setsnackbarValue({value: 'Please Enter State', color: 'red'});
      setVisible('true');
    } else if (city_name == '') {
      setsnackbarValue({value: 'Please Enter City', color: 'red'});
      setVisible('true');
    } 

    else if (zipcode == '') {
      setsnackbarValue({value: 'Please Enter Zipcode', color: 'red'});
      setVisible('true');
    }
 
    else if (street_address == '') {
      setsnackbarValue({value: 'Please Enter Street Address', color: 'red'});
      setVisible('true');
    }
    else if (details== '') {
      setsnackbarValue({value: 'Please Enter Details', color: 'red'});
      setVisible('true');
    }
    else {
      setloading(1);
      setdisable(1);
      CreateAcount()
    }
  };
    return (
      <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.container}> 
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
                headerlabel={'Create Account'}
                iconPress={() => { navigation.goBack() }}
                icon={'chevron-back'}
      
            />  
     <TouchableOpacity onPress={() =>
                             {refRBSheet.current.open(),
                                dispatch(setNavPlace('Account_Detail'))
                                }
                 }>
              <View style={styles.userimage}>
                {user_image != '' ? (
                  <Image
                    source={{uri: BASE_URL+user_image}}
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
              <Text style={Inputstyles.inputtoptext}>Name</Text>
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
                    ref_input5.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  keyboardType='email-address'
                  style={Inputstyles.input}
                />
              </View>
              <Text style={Inputstyles.inputtoptext}>Hotel Name</Text>
              <TouchableOpacity onPress={()=> refddRBSheet.current.open()} >
              <View style={Inputstyles.action}>
                <TextInput
                  value={hoteltype}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Country</Text>
          <TouchableOpacity
                onPress={() => refCountryddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                  value={country_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
          </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>State</Text>
          <TouchableOpacity
                onPress={() => refStateddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                 value={state_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
          </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>City</Text>
          <TouchableOpacity
                onPress={() => refCityddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                  value={city_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
        </TouchableOpacity>
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
                  keyboardType={'number-pad'}
                />
              </View>
      
              <Text style={Inputstyles.inputtoptext}>Street Address</Text>
          <View style={Inputstyles.action}>
            
            <TextInput
                  ref={ref_input6}
                  value={street_address}
              onChangeText={setStreet_address}
              placeholderTextColor={Colors.inputtextcolor}
              style={[Inputstyles.input,{height:maxheight===56?hp(75):hp(18)}]}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                ref_input7.current.focus();
              }}
              blurOnSubmit={false}
              multiline={true}
              maxLength={200}
              numberOfLines={2.5}
              onContentSizeChange={e => 
{                console.log('heretext htt',e.nativeEvent.contentSize.height)
                setHeight(e.nativeEvent.contentSize.height)}
              }
            />
          </View>
 
          <Text style={Inputstyles.inputtoptext}>Description</Text>
          <View style={[Multilineinputstyles.action, { height: wp('38%'), marginTop: wp('3%') }]}>
            <TextInput
                    ref={ref_input7}
                    onChangeText={setDetails}
              //placeholder="Tag Relevant Profession to increase the reach"
              //onChangeText={setReach}
              placeholderTextColor={Colors.inputtextcolor}
              multiline={true}

              style={Multilineinputstyles.input}
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
        
        <View style={{ marginBottom: hp(2), 
            marginTop: hp(12) }}>
            <CustomButtonhere
              title={'NEXT'}
              widthset={'78%'}
              topDistance={0}
              loading={loading}
              disabled={disable}
              onPress={
                () => 
                AcountValidation()
                //navigation.navigate('Drawerroute')
              }
            />
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
        <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Account Created Successfully'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),navigation.navigate('BottomTab')}}
                /> 
              <HotelTypes
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
        />
                       <CountryDropDown
          refRBSheet={refCountryddRBSheet}
          onClose={() => refCountryddRBSheet.current.close()}
        />
                         <StateDropDown
          refRBSheet={refStateddRBSheet}
          onClose={() => refStateddRBSheet.current.close()}
        />
                         <CityDropDown
          refRBSheet={refCityddRBSheet}
          onClose={() => refCityddRBSheet.current.close()}
        />
    </SafeAreaView>
</ScrollView>
    )
};

export default CreateAccount;