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
import {RadioButton,Snackbar,Menu } from 'react-native-paper';

//////////////////////app components///////////////
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomMenu from '../../../components/CustomMenu/CustomMenu';

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

/////////////////app images///////////
import { appImages } from '../../../constant/images';

const GuestsDetail = ({navigation,route}) => {
console.log('prevoius data:',route.params)
    /////////////////previous data state////////////////////////////////
    const [predata] = useState(route.params);

  /////////////////////////redux///////////////////
  const {phone_no,edit_user_image} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  ///////////////API data states////////////////////
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] =useState('');
  const [street_address, setStreet_address] = useState('');

  /////////////////////////Get Guests Data////////////////////
  const GetGuestsDetail=async() => {
    console.log("order request function",)
    await axios({
      method: 'GET',
      url: BASE_URL+'api/guest/specificGuest/'+predata.guest_id,
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
      setImage(response.data[0].img)
      setName(response.data[0].name)
      setEmail(response.data[0].email)
      setCity(response.data[0].city)
      setPhoneNo(response.data[0].phoneno)
    //   setState(response.data[0].estimated_amount)
    //   setZipcode(response.data.img)
    //   setCountry(response.data[0].car_type_id.price)
    //   setStreet_address(response.data[0].total_amount)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
    useEffect(() => {
        GetGuestsDetail()
    }, []);
  return (

      <SafeAreaView style={styles.container}>
            <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomHeader
          headerlabel={'Guest Details'}
          type={'crypto'}
          iconPress={() => { navigation.goBack() }}
          icon={'chevron-back'}
          onpresseacrh={() => <CustomMenu/>}
          searchicon={'add'}
        />
{/* <CustomMenu/> */}
              <View style={[styles.userimage,{marginTop:hp(7)}]}>
                  <Image
                    source={{uri:BASE_URL+image}}
                    style={{width: wp(12), height: hp(8)}}
                    resizeMode="contain"
                  />
              </View>
         <View style={{alignItems:'center',justifyContent:'center',margin:hp(2)}}>
            <Text style={styles.usernametext}>{name}</Text>
         </View>
         <View style={styles.lineview}></View>
         <View style={styles.detailview}>
            <Text style={styles.detaillefttext}>Phone Number</Text>
            <Text style={styles.detailrighttext}>{phoneNo}</Text>
         </View>
         <View style={styles.detailview}>
            <Text style={styles.detaillefttext}>Email</Text>
            <Text style={styles.detailrighttext}>{email}</Text>
         </View>
         <View style={styles.detailview}>
            <Text style={styles.detaillefttext}>City</Text>
            <Text style={styles.detailrighttext}>{city}</Text>
         </View>
         </ScrollView>
      </SafeAreaView>

  );
};

export default GuestsDetail;
