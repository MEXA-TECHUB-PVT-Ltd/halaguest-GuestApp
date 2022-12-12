import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Linking,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

//////app icons////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

///////////////////app components////////////
import OrdersCards from '../../../../components/CustomCards/OrderCards/Orders';
import CustomModal from '../../../../components/Modal/CustomModal';

////////app styles///////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

///////////////////map states//////////////////
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {MapKeyApi} from '../../../../utills/MapKey';

////////////location function////////////////
import {
  locationPermission,
  getCurrentLocation,
} from '../../../../api/CurrentLocation';

///////////////////app images//////////////
import {appImages} from '../../../../constant/images';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////////tOKEN IDS/////////////
import {Guest_DeviceToken} from '../../../../utills/ApiRootUrl';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TripRoute = ({navigation, route}) => {

  //previous data
  const [previousdata] = useState(route.params);

     ////////////isfocused//////////
     const isfocussed = useIsFocused()

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  //////////time function//////////
  const children = ({remainingTime}) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  ///////////////////map/////////////////////
  const mapRef = useRef();
  const markerRef = useRef();
  const ref = useRef();
  const [state, setState] = useState({
    curLoc: {
      latitude:    previousdata.driverLat,
      longitude:  previousdata.driverLng,
      // latitude: previousdata.pickupLat,
      // longitude: previousdata.pickupLng,
    },
    destinationCords: {
      latitude: previousdata.dropoffLat,
      longitude: previousdata.dropoffLng,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 1000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  const fetchTime = (d, t) => {
       setroutetime(t)
    updateState({
      distance: d,
      time: t,
    });
  };

  /////////////////////Call to Guest Function/////////////////
  const callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    if (isfocussed) {
    GetOrderDetail();
    CallApi()
    }
    ref.current?.setAddressText('Rawalpindi');
    const interval = setInterval(() => {
      //CheckStatus()
    }, 1000);
    return () => clearInterval(interval);
  }, [isfocussed,OrderStatus]);
////////////////CHECK STATUS//////////
const CheckStatus=()=>{

  if(OrderStatus === 'completed')
  {
    setModalVisible(true)
  }
  else
  {
console.log('same ongong status',OrderStatus)
  }
}
const CheckRideStatus = async () => {
  console.log('here ids',orderid)
      axios({
        method: 'POST',
        url: BASE_URL + 'api/Order/checkRideStatus',
        data: {
          _id: orderid,
        },
      })
        .then(function (response) {
        console.log(' Cancel response', JSON.stringify(response.data));
       navigation.navigate("TripCompleted",{  
        orderid: orderid,
        pickupLat: PickupLat,
        pickupLng: PickupLng,
        dropoffLat: DropoffLat,
        dropoffLng: DropoffLng})
          
        })
        .catch(function (error) {
          console.log('error', error);
        });
    };
////////////////Check api STATUS//////////
const[routetime,setroutetime]=useState()
const CallApi=async()=>{
console.log("here",routetime*60)
var duration=routetime*60
var count=0
if(count ==0){
setTimeout(() => {
  count+1
  CheckRideStatus()
        }, duration);
        }
        else{
          setTimeout(() => {
            CheckRideStatus()
                  }, 120);
        }
}

  //order detail data states and apin function
  ///////////////HOTEL//////////////////
  const [HotelToken, setHotelToken] = useState('');
  /////////////GUEST/////////////
  const [GuestToken, setGuestToken] = useState('');
  const [GuestId, setGuestId] = useState('');
  const [GuestName, setGuestName] = useState('');
  const [GuestPic, setGuestPic] = useState('');
  const [GuestNo, setGuestNo] = useState('');
  ////////////DRIVER/////////////
  const [Driverpic, setDriverPic] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [DriverCar, setDriverCar] = useState('');
  /////////////LOCATION///////////
  const [PickupLocation, setPickupLocation] = useState('');
  const [DropoffLocation, setDropoffLocation] = useState('');
  const [PickupLat, setPickupLat] = useState();
  const [PickupLng, setPickupLng] = useState();
  const [DropoffLat, setDropoffLat] = useState();
  const [DropoffLng, setDropoffLng] = useState();
  ///////////ORDER////////
  const [OrderNo, setOrderNo] = useState('');
  const [orderid, setOrderId] = useState('');
  const [OrderStatus, setOrderStatus] = useState('');

  const GetOrderDetail = async () => {
    console.log('order request function');
    await axios({
      method: 'GET',
      url: BASE_URL + 'api/Order/specificOrder/' + route.params.orderid,
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        setGuestId(response.data[0].guest_id._id);
        setGuestName(response.data[0].guest_id.name);
        setGuestPic(response.data[0].guest_id.img);
        setGuestNo(response.data[0].guest_id.phoneno);
        setDriverPic(response.data[0].driver_id.img);
        setDriverName(response.data[0].driver_id.name);
        setDriverCar(response.data[0].driver_id.vehicle_detail_id[0].make);
        setPickupLocation(response.data[0].pickup_location);
        setDropoffLocation(response.data[0].dropoff_location);
        setPickupLat(Number(response.data[0].pickup_lat));
        setPickupLng(Number(response.data[0].pickup_log));
        setDropoffLat(response.data[0].dropoff_lat);
        setDropoffLng(response.data[0].dropoff_log);
        setOrderStatus(response.data[0].status);
        setOrderNo(response.data[0].orderNo);
        setOrderId(response.data[0]._id);
        setHotelToken(response.data[0].guest_id.hotel_id[0].device_token);
        setGuestToken(response.data[0].guest_id.device_token);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  return (
    <View style={[styles.container]}>
      {previousdata.pickupLat && previousdata.pickupLng > 0 ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={appImages.car}
              style={{
                width: 40,
                height: 40,
                //transform: [{rotate: `${heading}deg`}]
              }}
              resizeMode="contain"
            />
          </Marker.Animated>
          {Object.keys(destinationCords).length > 0 && (
            <Marker coordinate={destinationCords} image={appImages.orangeloc} />
          )}

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={MapKeyApi}
              strokeWidth={6}
              strokeColor="red"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(`Started routing between "${params.origin}" 
                            and "${params.destination}"`);
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                fetchTime(result.distance, result.duration),
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
      ) : null}
      <View style={{marginLeft: wp(3), marginTop: hp(2), marginBottom: hp(1)}}>
        <Ionicons
          name={'chevron-back'}
          size={30}
          color={Colors.Appthemeorangecolor}
          onPress={() => refRBSheet.current.open()}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <OrdersCards
          navplace={'trip'}
          pickupLoc={PickupLocation}
          dropoffLoc={DropoffLocation}
        />
      </View>
      <View style={[styles.lastView]}>
        <View
          style={{
            backgroundColor: 'white',
            height: hp(25),
            paddingTop: hp(2),
            width: wp(100),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: hp(2),
              marginHorizontal: wp(5),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp(1),
              }}>
              <Image
                //source={appImages.ProfileUser}
                source={{uri: BASE_URL + Driverpic}}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={{marginLeft: wp(3)}}>
                <Text style={styles.drivertext}>{DriverName}</Text>
                <Text style={styles.vehicletext}>{DriverCar}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              width: wp(85),
              alignSelf: 'center',
              marginBottom: hp(4),
              marginTop: 3,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(5),
            }}>
            <TouchableOpacity
              onPress={() => callNumber(GuestNo)}
              style={[
                styles.tripbtn,
                {backgroundColor: Colors.BottomTabcolor},
              ]}>
              <Ionicons
                name={'call'}
                size={23}
                color={'white'}
                onPress={
                  () => callNumber(GuestNo)
                  // refRBSheet.current.open()
                }
              />
              <Text style={styles.triptext}>CALL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  userid: GuestId,
                  username: GuestName,
                  userpic: GuestPic,
                  orderId: orderid,
                  navplace: 'Trip',
                })
              }
              style={styles.tripbtn}>
              <Ionicons
                name={'chatbubbles-sharp'}
                size={23}
                color={'white'}
                onPress={
                  () => {}
                  // refRBSheet.current.open()
                }
              />
              <Text style={styles.triptext}>CHAT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Trip Completed Go for Rate'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),navigation.navigate('Rattings',{orderid:orderid,
  navplace:'completedtrip'})}}
                /> 
    </View>
  );
};

export default TripRoute;
