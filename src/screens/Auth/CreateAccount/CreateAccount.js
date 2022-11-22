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

/////////////////app images///////////
import { appImages } from '../../../constant/images';

////////////token api///////////////
import { checkPermission } from '../../../api/FCMToken';


const CreateAccount = ({ navigation,route }) => {

    ////////////prevous data States///////////////
    const [predata] = useState(route.params);

      ///////////////////radio button state///////////////////
  const [checked, setChecked] = React.useState('male');

      /////////////////////////redux///////////////////
      const { hoteltype,login_user_id, phone_no,user_image ,country_name,state_name,city_name } =
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
  const[FCMToken,setFCMToken]=useState()
 //////////////////////Api Calling/////////////////
 const Createuser = async() => {
  var user= await AsyncStorage.getItem('Userid')
  var date=new Date()
  console.log("userid:",date)
    axios({
      method: 'POST',
      url: BASE_URL + 'api/hotel/createHotel',
      data: {
        hotel_name: hoteltype,
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
        console.log("here in google password",result);
        setFCMToken(result)
        //do something with the result
      })
    }, []);

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
        
        <View style={{ marginBottom: hp(2), 
            marginTop: hp(12) }}>
            <CustomButtonhere
              title={'NEXT'}
              widthset={'78%'}
              topDistance={0}
              onPress={() => 
                Createuser()
               // navigation.navigate('Drawerroute')
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