import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, FlatList, StatusBar, ImageBackground,BackHandler,
    ScrollView,
    Image, View, Text, TouchableOpacity, TextInput,ActivityIndicator
} from 'react-native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker,PROVIDER_GOOGLE,AnimatedRegion } from 'react-native-maps';
import { MapKeyApi } from '../../../utills/MapKey';


//////////////////app icons////////////////
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import DashboardHeader from '../../../components/Header/DashboardHeade';
import ViewAll from '../../../components/ViewAll/ViewAll';
import GuestCards from '../../../components/CustomCards/GuestCards/GuestCards';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import CustomCards from '../../../components/CustomCards/CustomCards';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge } from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import TopTabstyles from '../../../styles/GlobalStyles/TopTabstyles';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../../constant/images';

//////////////////current location function/////////////
import {
  locationPermission,
  getCurrentLocation,
} from '../../../api/CurrentLocation';


const Orderss = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd9556-145571e29d72',
        title: 'Third Item',
      },
  ];

const Home = ({ navigation }) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    const { name, age } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();


    const _map = React.useRef(null);
  /////////////map states////////////
  const [mapmargin, setMapMargin]=useState(1)
    const [eror, setError]=useState()
const [region, setRegion] = useState();
const [marker, setMarker] = useState();
const [pinlat, setPinLat] = useState(56.002716);
const [pinlog, setPinLog] = useState(-4.580081);
const [userloc, setuserloc] = useState(false);

            /////////////main menu status states/////////////
    const [Orders, setOrders] = useState('')
    const GetOrders = async () => {
      var user= await AsyncStorage.getItem('Userid')
      axios({
          method: 'GET',
          url: BASE_URL + 'api/Order/getGuestOrdersByTime/'+user,
      })
          .then(async function (response) {
            setOrders(response.data)
          })
          .catch(function (error) {
              console.log("error", error)
          })
      }
///////////////////map states//////////
const [guest_lat, setGuest_lat] = useState();
const [guest_log, setGuest_log] = useState();
const [guest_location, setGuest_location] = useState();

////////////////get live location//////////////
const getLiveLocation = async () => {
Geocoder.init(MapKeyApi); 
const locPermissionDenied = await locationPermission()
if (locPermissionDenied) {
    const { latitude, longitude, heading } = await getCurrentLocation()
    // console.log("get live location after 4 second",latitude,longitude,heading)
    setGuest_lat(latitude)
    setGuest_log(longitude)
    Geocoder.from(latitude,
      longitude)
       .then(json => {
var addressComponent = json.results[0].formatted_address;
setGuest_location(addressComponent)
       })
}
}
    useEffect(() => {
      const interval = setInterval(() => {
          GetOrders()
      }, 6000);
      return () => clearInterval(interval);
      getLiveLocation()
      GetAcountDetail()
    }, []);

      ///////////////data states////////////////////
  const [username, setUserName] = React.useState();
  const [image, setUserImage] = React.useState();
    const GetAcountDetail=async() => {
      var user= await AsyncStorage.getItem('Userid')
      console.log("order request function",user)
  
      await axios({
        method: 'GET',
        url: BASE_URL+'api/guest/specificGuest/'+user,
      })
      .then(function (response) {
        //console.log("response get here dispatcher", JSON.stringify(response.data))
        setUserImage(response.data[0].img)
        setUserName(response.data[0].name)
      })
      .catch(function (error) {
        console.log("error", error)
      })
      }
    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <DashboardHeader
                headerlabel={username}
                image={image}
                iconPress={() => { navigation.toggleDrawer()}}
                icon={'menu'}
                onpresseacrh={() => onSearch()}
            />

<View style={{height: hp(30)}}>
      {guest_lat && guest_log > 0 ? (
        <MapView
          style={[styles.mapStyle]}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={{
            latitude: guest_lat,
            longitude: guest_log,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {guest_lat && guest_log > 0  ? (
            <Marker
              draggable={true}
              coordinate={{
                latitude: guest_lat,
                longitude: guest_log,
              }}
            />
          ) : null}
        </MapView>
      ) : null}
    </View>

<View style={styles.locview}>
<Icon name={'location'} size={25} 
          color= {Colors.Appthemeorangecolor}
           //onPress={props.iconPress} 
           />
<Text style={styles.loctext}>{guest_location}</Text>
</View>
<ViewAll
                headerlabel={'Upcoming Trips'}
                onpress={() =>navigation.navigate('Orders')}
            />
{Orders === ''?null:

Orders.slice(0, 3).map((item, key) => (
<OrdersCards
                                      
                                      time={item.flight_time}
                                       price={item.total_amount+'$'}
                                       pickupLoc={item.pickup_location}
                                       dropoffLoc={item.dropoff_location}
                    
                                   />
))}


</ScrollView>
</SafeAreaView>

    )
};

export default Home;