import React,{useState,useEffect,useRef} from 'react';
// Import required components
import {SafeAreaView, StyleSheet,TextInput,  Animated,ScrollView,Image,
     View,Text,TouchableOpacity,ActivityIndicator,TouchableHighlight
} from 'react-native';

//////////////////app components////////////////
import OrdersCards from '../../../../components/CustomCards/OrderCards/Orders';
import CustomModal from '../../../../components/Modal/CustomModal';


//////////////app pakages////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker,PROVIDER_GOOGLE,AnimatedRegion } from 'react-native-maps';
import { MapKeyApi } from '../../../../utills/MapKey';

//////////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
 
////////////////app redux///////////
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../../../redux/actions';


//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////app images/////////////////
import { appImages } from '../../../../constant/images';


const TripCompleted = ({navigation}) => {

  ////////////////////redux/////////////////////
  const { theme ,maptheme} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();  

          //////////locationtype state/////////////
          const refRBSheet = useRef();  

              
      //Modal States
      const [modalVisible, setModalVisible] = useState(false);

    ////////////isfocused//////////
    const isfocussed = useIsFocused()


    //////////////////////map default location///////////////////
    const defaultlocation =()=>{
      //setuserloc(true)
      setPinLat(56.002716)
      setPinLog(-4.580081)
      setusercurrloc(false)

    }

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);


  const _map = React.useRef(null);

  /////////////map states////////////
  const [mapmargin, setMapMargin]=useState(1)
    const [eror, setError]=useState()
const [region, setRegion] = useState();
const [marker, setMarker] = useState();
const [pinlat, setPinLat] = useState(56.002716);
const [pinlog, setPinLog] = useState(-4.580081);
const [userloc, setuserloc] = useState(false);


////////////////usercurrrent location///////////
const [usercurrloc, setusercurrloc] = useState(false);

////////////////All location///////////
const [allloc, setAllloc] = useState(false);

/////////////user current location////////////////
const GetcurrLocation=()=>{
  Geocoder.init(MapKeyApi); 
  Geolocation.getCurrentPosition(
                  (position) => {
                    setPinLat(position.coords.latitude)
                    setPinLog(position.coords.longitude)
                  setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0462,
                    longitudeDelta: 0.0261,
                  });
                  console.log('map regions:',region)
                  setMarker({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                      Geocoder.from(position.coords.latitude,
                         position.coords.longitude)
                          .then(json => {
                              console.log(json);
      var addressComponent = json.results[0].address_components;
                          })

                          .catch(error => console.warn(error));
                  },
                  (error) => {
                      // See error code charts below.
                  
                              setError(error.message)
                     
                          console.log(error.code, error.message);
                  },
                  {
                      enableHighAccuracy: false,
                      timeout: 10000,
                      maximumAge: 100000
                  }
              );
}
useEffect(() => {
  if (isfocussed) {
GetLocation()
GetUser()
}

  },[isfocussed]);
//////////////// location data state///////////
const [pinsdata, setPinsdata] = useState();
  //////////////Api Calling////////////////////
const GetLocation=async() => {
  console.log('here',BASE_URL+'location/getAllLocations')
  axios({
  method: 'GET',
  url: BASE_URL+'location/getAllLocations',
  })
  .then(async function (response) {
  console.log("response here in LOCATION", JSON.stringify(response.data.data))
  setPinsdata(response.data.data)
      //navigation.navigate('Drawerroute')
  })
  .catch(function (error) {
  if(error)
  {     console.log('Email or Password is incorrect')}
  //setModalVisible(true)
  
  console.log("error", error)
  })
  }
//////////////// location data state///////////
const [ParkingDetail, setParkingDetail] = useState();
const [ParkingID, setParkingID] = useState();
const [ParkingTime, setParkingTime] = useState();
const [count, setcount] = useState(1);
//const count =0
  //////////////Api Calling////////////////////
const GetUser=async() => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid:",user,count)
  axios({
  method: 'GET',
  url: BASE_URL+'user/getUser/'+user,
  })
  .then(async function (response) {
  console.log("response here in get useer detail", JSON.stringify(response.data))
  setParkingDetail(response.data.userDetails[0].user_parkings[0].isParked)
  //setParkingDetail(response.data.userDetails[0].user_parkings)
  setParkingID(response.data.userDetails[0].user_parkings[0]._id)
  setParkingTime(response.data.userDetails[0].user_parkings[0].parkTime)
  })
  .catch(function (error) {
  if(error)
  {     console.log('Email or Password is incorrect')}
  //setModalVisible(true)
  
  console.log("error", error)
  })
  }


  return (
      <View style={[styles.container,{marginBottom:mapmargin, backgroundColor: theme === false? 'white':'  black'}]}>
        <MapView
        ref={_map}
          style={[styles.mapStyle,{marginBottom:mapmargin}]}
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps 
          onMapReady={()=> { setMapMargin(0)} }
          onRegionChange ={() => setuserloc(true)}
          onRegionChangeComplete={
            _map.current?.animateToRegion({
              latitude: pinlat,
              longitude: pinlog,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              //duration: 1
            })
       
          } 
          initialRegion={      {
            latitude: pinlat,
            longitude: pinlog,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLayout={()=>{
            _map.current.fitToCoordinates({latitude: pinlat, longitude: pinlog})
          }}
     
        >
                  {allloc === true?
                  pinsdata.map((marker, index) => {
          return (
        
            <Marker key={index} 
            coordinate={
              {      
                      latitude: marker.location.coordinates[0],
                      longitude: marker.location.coordinates[1]
            }}
            //coordinate={location.coordinates} 
           // onPress={(e)=>onMarkerPress(e)}
           >
 
            </Marker>
 
          );
        }):null}
                    {marker != ''?
                  <Marker
                  draggable={true}
                  coordinate={
                    {      
                    latitude: pinlat,
                    longitude: pinlog
                  }}
                    title={'title'}
                    description={'here'}
                    onDragStart={(e)=>
                      console.log('Darg Start:',e.nativeEvent.coordinate)}
                      onDragEnd={(e)=>
                       { console.log('Darg Start:',e.nativeEvent.coordinate),
                       setPinLat(e.nativeEvent.coordinate.latitude)
                       setPinLog(e.nativeEvent.coordinate.longitude)
                        console.log('Darg Start:',pinlat,pinlog)}
                      }
                  />
                  :
                  null
                }
        </MapView>
        <View style={{marginLeft:wp(3),marginTop:hp(2),marginBottom:hp(1)}}>
        <Ionicons name={'chevron-back'} size={30} 
          color= {Colors.Appthemeorangecolor}
          onPress={() => navigation.goBack()}/>

        </View>
        <View style={{alignItems:'center'}}>
<OrdersCards
navplace={'trip'}
                                       pickupLoc={'pickup'}
                                       dropoffLoc={'dropoff'}
                                   />
    
    </View>
      <View
style={styles.lastView}
      > 
      <View style={{backgroundColor:'white',
      height:hp(27),paddingTop:hp(2),
    width:wp(100)}}>

      <View style={{flexDirection:'row',alignItems:'center',marginBottom:hp(2),
      marginHorizontal:wp(5)}}>
      <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:wp(1)}}>
          <Image
                    source={appImages.ProfileUser}
                    style={styles.image}
                    resizeMode='contain'
                  />
                  <View style={{marginLeft:wp(3)}}>
                  <Text 
              style={styles.drivertext}
                >Driver name here</Text>
                          <Text 
              style={styles.vehicletext}
                >HONDA XLI </Text>
                  </View>
                  
          </View>
      
          </View>
          <View style={{borderBottomColor:'#DCDCDC',
          borderBottomWidth:1,
          width:wp(85),alignSelf:'center',
          marginBottom:hp(4),marginTop:(3)}}></View>
          <View style={{marginHorizontal:wp(5)}}>
      <TouchableOpacity onPress={()=> navigation.navigate('Rattings')}
       style={[styles.tripbtn,{backgroundColor:Colors.Appthemecolor,width:wp(70),alignSelf:'center'}]}>
                      <Text 
              style={styles.triptext}
                >MARK AS REACHED</Text>
      </TouchableOpacity>
          </View>
  

      </View>
      </View>

                      <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Reason Submitted'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false)}}
                /> 
      </View>


  );
};
 
export default TripCompleted;

