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

            axios({
                method: 'GET',
                url: BASE_URL + 'api/Order/allOrders',
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setOrders(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
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
        GetcurrLocation()
        GetOrders()
      
    }, []);
    useEffect(() => {
        // back handle exit app
        BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
        };
    }, []);
let backHandlerClickCount = 0;
    const backButtonHandler = () => {
        const shortToast = message => {
            Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
            });
        }
        let backHandlerClickCount;
        backHandlerClickCount += 1;
        if ((backHandlerClickCount < 2)) {
            shortToast('Press again to quit the application');
        } else {
            BackHandler.exitApp();
        }

        // timeout for fade and exit
        setTimeout(() => {
            backHandlerClickCount = 0;
        }, 1000);
        
        return true;
    }
    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <DashboardHeader
                headerlabel={'Username'}
                userimage={appImages.ProfileUser}
                iconPress={() => { navigation.toggleDrawer()}}
                icon={'menu'}
                onpresseacrh={() => onSearch()}
            />

<View style={{height:hp(30)}}>
    {pinlat && pinlog >0?
    <MapView
    style={[styles.mapStyle]}
   provider={PROVIDER_GOOGLE} // remove if not using Google Maps 
    initialRegion={      {
      latitude: pinlat,
      longitude: pinlog,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
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
:null}

</View>

<View style={styles.locview}>
<Icon name={'location'} size={25} 
          color= {Colors.Appthemeorangecolor}
           //onPress={props.iconPress} 
           />
<Text style={styles.loctext}>User current Location Here</Text>
</View>
<ViewAll
                headerlabel={'Upcoming Trips'}
                onpress={() =>navigation.navigate('GuestsList')}
            />
{Orderss === ''?null:

Orderss.slice(0, 3).map((item, key) => (
<OrdersCards
                                      
                                    //   time={item.flight_time}
                                    //    price={item.total_amount+'$'}
                                    //    pickupLoc={item.pickup_location}
                                    //    dropoffLoc={item.dropoff_location}
                                    time={'00:00 pm'}
                                    price={'200'+'$'}
                                    pickupLoc={'Pickup location here'}
                                    dropoffLoc={'Drop off location here'}
                                   />
))}


</ScrollView>
</SafeAreaView>

    )
};

export default Home;