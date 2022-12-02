import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

////////////////////DashLine////////////
import DashedLine from 'react-native-dashed-line';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

//////////////////app components///////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../components/Button/CustomButton';
import Loader from '../../../components/Loader/Loader';

//////////////map////////////////
import MapView, { PROVIDER_GOOGLE,Polyline,Marker,AnimatedRegion  } 
from 'react-native-maps';

///////////////////app icons////////////////////////
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////////app styles///////////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app images////////////////
import {appImages} from '../../../constant/images';

const OrderDetail = ({navigation, route, userid}) => {

  ////////////isfocused//////////
  const isfocussed = useIsFocused()

  //Modal States
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  //order detail data states and apin function
  const [GuestToken,setGuestToken]=useState('')
  const [HotelToken,setHotelToken]=useState('')
  const [GuestPic, setGuestPic] = useState('');
  const [GuestName, setGuestName] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [OrderNo, setOrderNo] = useState('');
  const [FlightDate, setFlightDate] = useState('');
  const [FlightTime, setFlightTime] = useState('');
  const [EstimatedAmount, setEstimatedAmount] = useState('');
  const [Comision, setComision] = useState('');
  const [CarPrice, setCarPrice] = useState('');
  const [TotalAmount, setTotalAmount] = useState('');
  const [DriverNotes, setDriverNotes] = useState('');
  const [PickupLocation, setPickupLocation] = useState('');
  const [DropoffLocation, setDropoffLocation] = useState('');
  const [PickupLat, setPickupLat] = useState();
  const [PickupLng, setPickupLng] = useState();
  const [DropoffLat, setDropoffLat] = useState();
  const [DropoffLng, setDropoffLng] = useState();
  const [OrderStatus, setOrderStatus] = useState('');

  const GetOrderDetail = async () => {
    console.log('order request function');
    await axios({
      method: 'GET',
      url: BASE_URL + 'api/Order/specificOrder/' + route.params.orderid,
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        setGuestPic(response.data[0].guest_id.img);
        setGuestName(response.data[0].guest_id.name);
        setDriverName(response.data[0].driver_id.name);
        setFlightDate(response.data[0].flight_date);
        setFlightTime(response.data[0].flight_time);
        setEstimatedAmount(response.data[0].estimated_amount);
        setCarPrice(response.data[0].car_type_id.price);
        setTotalAmount(response.data[0].total_amount);
        setDriverNotes(response.data[0].driver_notes);
        setPickupLocation(response.data[0].pickup_location);
        setDropoffLocation(response.data[0].dropoff_location);
        setPickupLat(response.data[0].pickup_lat);
        setPickupLng(response.data[0].pickup_log);
        setDropoffLat(response.data[0].dropoff_lat);
        setDropoffLng(response.data[0].dropoff_log);
        setOrderStatus(response.data[0].status);
        setOrderNo(response.data[0].orderNo);
        setHotelToken(response.data[0].guest_id.hotel_id[0].device_token)
        setGuestToken(response.data[0].guest_id.device_token)
        setloading(false)
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
////////////////loading/////////////
const [loading, setloading] = useState(true);
  useEffect(() => {
    if (isfocussed) {
    GetOrderDetail();
    }
  }, [isfocussed]);

  return (
    
    <SafeAreaView style={styles.container}>
        <Loader
    isLoading={loading}
    />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <CustomHeader
          headerlabel={'Order Details'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
        <View style={styles.ordertopview}>
          <Text style={styles.ordertoptext}>Order # {OrderNo}</Text>
        </View>

        <View style={{marginHorizontal: wp(5)}}>
          <View style={styles.userdetail}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Image
                //source={require('../../../assets/dataimages/user.png')}
                source={{uri: BASE_URL + GuestPic}}
                style={{
                  height: 50,
                  width: 50,
                  borderColor: Colors.activeinputs,
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              />

              <Text style={styles.usernametext}> {GuestName}</Text>
            </View>

            <View
              style={[
                styles.status,
                {
                  backgroundColor:
                    route.params.navplace === 'Schedule'
                      ? Colors.Appthemeorangecolor
                      :  route.params.navplace === 'Completed'
                      ?'#00D640':'red',
                },
              ]}>
              <Text style={styles.statustext}>
                {route.params.navplace === 'Schedule'
                  ? 'Scheduled'
                  : 'Completed'}
              </Text>
            </View>
          </View>
          <View style={styles.detailview}>
            <Text style={styles.detailtextleft}>Flight Date</Text>
            <Text style={styles.detailtextright}>{FlightDate}</Text>
          </View>
          <View style={styles.detailview}>
            <Text style={styles.detailtextleft}>Flight Time</Text>
            <Text style={styles.detailtextright}>{FlightTime}</Text>
          </View>
          <View style={styles.lineview}></View>
          {/* <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Estimate Amount</Text>
    <Text style={styles.detailtextright}>
    {EstimatedAmount}</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Comission</Text>
    <Text style={styles.detailtextright}>
   </Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Car Price</Text>
    <Text style={styles.detailtextright}>
   {CarPrice}</Text>
   </View> */}
          <View style={styles.detailview}>
            <Text style={styles.detailtextleft}>Total Amount</Text>
            <Text style={styles.detailtextright}>{TotalAmount}</Text>
          </View>
          <View style={styles.lineview}></View>
          <View style={{marginTop: hp(3)}}>
            <Text style={styles.detailtextleft}>Driver Notes</Text>
            <View
              style={{
                marginBottom: '2%',
              }}>
              <Text style={styles.notestext}>{DriverNotes}</Text>
            </View>
          </View>
          <Text style={styles.detailtextleft}>Locations</Text>
          {/* <Text style={styles.locationtext}>Pickup to Dropoff Location</Text> */}

          <View style={{marginBottom:hp(5)}}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginBottom: 5,
                alignItems: 'center',
                //backgroundColor:'yellow'
              }}>
              <Ionicons
                name="location"
                color={Colors.Appthemeorangecolor}
                size={25}></Ionicons>
              <Text style={styles.subtext}>{PickupLocation}</Text>
            </View>
            {/* <View style={{height:hp(15)}}>

{PickupLat && PickupLng > 0 ? (
        <MapView
          style={[styles.mapStyle]}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={{
            latitude: PickupLat,
            longitude: PickupLng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {PickupLat && PickupLng > 0 ? (
            <Marker
              coordinate={{
                latitude: PickupLat,
                longitude: PickupLng,
              }}
            />
          ) : null}
        </MapView>
      ) : null} 
</View> */}

            <DashedLine
              axis="vertical"
              dashLength={5}
              color={'red'}
              style={{paddingLeft: wp(6), height: hp(5)}}
            />

            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                marginTop: hp(1),
                marginBottom: hp(3),
                alignItems: 'center',
                //backgroundColor:'yellow'
              }}>
              <Ionicons
                name="location"
                color={Colors.BottomTabcolor}
                size={25}></Ionicons>
              <Text style={styles.subtext}>{DropoffLocation}</Text>
            </View>
            <View style={{height: hp(25), width: wp(90), alignItems: 'center'}}>
            {DropoffLat && DropoffLng >0 ? (
                <MapView
                  style={[styles.mapStyle]}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  initialRegion={{
                    latitude: DropoffLat,
                    longitude: DropoffLng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  {PickupLat && PickupLng > 0 ? (
                    <Marker
                      coordinate={{
                        latitude: PickupLat,
                        longitude: PickupLng,
                      }}
                      //icon={<Ionicons name='location' color={Colors.BottomTabcolor}  size={25}></Ionicons>}
                      image={appImages.orangeloc}
                    />
                  ) : null}
                  {DropoffLat && DropoffLng > 0 ? (
                    <Marker
                      coordinate={{
                        latitude: DropoffLat,
                        longitude: DropoffLng,
                      }}
                      image={appImages.blueloc}
                    />
                  ) : null}
                </MapView>
              ) : null}
            </View>
          </View>
        </View>
        {/* {OrderStatus === 'ongoing' ? (
          <View style={{height: hp(20)}}>
            <CustomButtonhere
              title={'TRACK TRIP'}
              widthset={78}
              topDistance={10}
              onPress={() => {
                //dispatch(setPhoneNumber(number)),
                //navigation.navigate('Verification',{Phonenumber:number})}
                navigation.navigate('TripRoute');
              }}
            />
          </View>
        ) : null}
        {OrderStatus === 'schedule' ? (
          <View
            style={{
              height: hp(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(7),
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(true);
              }}
              style={{
                height: hp(7),
                width: wp(40),
                backgroundColor: Colors.Appthemecolor,
                borderRadius: wp(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.btntext}>CANCEL ORDER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible2(true);
              }}
              style={{
                height: hp(7),
                width: wp(40),
                backgroundColor: Colors.Appthemecolor,
                borderRadius: wp(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.btntext}>START ORDER</Text>
            </TouchableOpacity>
          </View>
        ) : null} */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;
