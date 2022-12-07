import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, FlatList, StatusBar,
    ScrollView,
    Image, View, Text, TouchableOpacity,
} from 'react-native';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import IconsTopTabs from '../../../components/TopTabs/IconsTabs/IconsTopTabs';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setTopTabDriver,setTopTabPayment,setTopTabVehicle } from '../../../redux/actions';

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

const Orders = ({ navigation }) => {

     ////////////isfocused//////////
  const isfocussed = useIsFocused()
  
    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

      /////////////main menu status states/////////////
      const [Schedule, setSchedule] = useState(true)
      const [Ongoing, setOngoing] = useState(false)
      const [Complete, setComplete] = useState(false)
      const [Cancel, setCancel] = useState(false)


            /////////////main menu status states/////////////
    const [ScheduleOrders, setScheduleOrders] = useState('')
        const GetScheduleOrders = async () => {
            var user= await AsyncStorage.getItem('Userid')
            axios({
                method: 'POST',
                url: BASE_URL + 'api/Order/getGuestOrdersByStatus',
                data: {
                    guest_id: user,
                    status: 'schedule',
                  },
            })
                .then(async function (response) {
                    setScheduleOrders(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
                    /////////////main menu status states/////////////
                    const [OngoingOrders, setOngoingOrders] = useState('')
                    const GetOngoingOrders = async () => {
                        var user= await AsyncStorage.getItem('Userid')
                        axios({
                            method: 'POST',
                            url: BASE_URL + 'api/Order/getGuestOrdersByStatus',
                            data: {
                                guest_id: user,
                                status: 'ongoing',
                              },
                        })
                            .then(async function (response) {
                                setOngoingOrders(response.data)
                            })
                            .catch(function (error) {
                                console.log("error", error)
                            })
                        }
                                /////////////main menu status states/////////////
                const [CompleteOrders, setCompleteOrders] = useState('')
                const GetCompleteOrders = async () => {
                    var user= await AsyncStorage.getItem('Userid')
                    axios({
                        method: 'POST',
                        url: BASE_URL + 'api/Order/getGuestOrdersByStatus',
                        data: {
                            guest_id: user,
                            status: 'completed',
                          },
                    })
                        .then(async function (response) {
                            setCompleteOrders(response.data)
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        })
                    }
                /////////////main menu status states/////////////
                const [CancelOrders, setCancelOrders] = useState('')
                const GetCancelOrders = async () => {
                    var user= await AsyncStorage.getItem('Userid')
                    axios({
                        method: 'POST',
                        url: BASE_URL + 'api/Order/getGuestOrdersByStatus',
                        data: {
                            guest_id: user,
                            status: 'cancel',
                          },
                    })
                        .then(async function (response) {
                            setCancelOrders(response.data)
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        })
                    }
            

    useEffect(() => {
        const interval = setInterval(() => {
            if (isfocussed) {
                GetScheduleOrders()
                GetOngoingOrders()
                GetCompleteOrders()
                GetCancelOrders()
                }
          }, 6000);
          return () => clearInterval(interval);
    }, [isfocussed]);

    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Trips'}

        />
              <View style={[TopTabstyles.TopTabView,{paddingHorizontal:wp(3)}]}>
                <TouchableOpacity onPress={() => {
                     setSchedule(true),setOngoing(false), setComplete(false),setCancel(false)
                     }}>
                    <IconsTopTabs
                        title={'Schedule'}
                        icon={appImages.Schedule}
                        width={'20%'}
                        state={Schedule}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                         setSchedule(false),setOngoing(true), setComplete(false),setCancel(false)
                }}>
                    <IconsTopTabs
                        title={'Ongoing'}
                        icon={appImages.Ongoing}
                        width={'20%'}
                        state={Ongoing}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                              setSchedule(false),setOngoing(false), setComplete(true),setCancel(false)
                }}>
                    <IconsTopTabs
                        title={'Completed'}
                        icon={appImages.Completed}
                        width={'20%'}
                        state={Complete}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                        setSchedule(false),setOngoing(false), setComplete(false),setCancel(true)
                }}>
                    <IconsTopTabs
                        title={'Cancel'}
                        icon={appImages.Cancel}
                        width={'20%'}
                        state={Cancel}
                    />
                </TouchableOpacity>
            </View>
        {Schedule ? (

ScheduleOrders === ''?null:

ScheduleOrders.map((item, key) => (
    <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Schedule'})}>
<OrdersCards
                                      time={item.flight_time}
                                       price={item.total_amount+'$'}
                                       pickupLoc={item.pickup_location}
                                       dropoffLoc={item.dropoff_location}
                                   />
                                   </TouchableOpacity>
))
        ) : Ongoing? (
            OngoingOrders === ''?null:

            OngoingOrders.map((item, key) => (
                <TouchableOpacity onPress={()=>navigation.navigate('TripRoute',{orderid:item._id,
                pickupLat:item.pickup_lat,pickupLng:item.pickup_log,
                dropoffLat:item.dropoff_lat,dropoffLng:item.dropoff_log,
                navplace:'ongoing'})}>
            <OrdersCards                        
                                                  time={item.flight_time}
                                                   price={item.total_amount+'$'}
                                                   pickupLoc={item.pickup_location}
                                                   dropoffLoc={item.dropoff_location}
                                               />
                                                    </TouchableOpacity>
            ))
        ) 
        : Complete ? (
            CompleteOrders === ''?null:

            CompleteOrders.map((item, key) => (
                <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Completed'})}>
            <OrdersCards                        
                                                  time={item.flight_time}
                                                  date={item.flight_date}
                                                   price={item.total_amount+'$'}
                                                   pickupLoc={item.pickup_location}
                                                   dropoffLoc={item.dropoff_location}
                                                   type={'Schedule'}
                                               />
                                                    </TouchableOpacity>
            ))
        ) 
         : Cancel ? (
            CancelOrders === ''?null:

            CancelOrders.map((item, key) => (
                <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Cancel'})}>
            <OrdersCards                        
                                                  time={item.flight_time}
                                                  date={item.flight_date}
                                                   price={item.total_amount+'$'}
                                                   pickupLoc={item.pickup_location}
                                                   dropoffLoc={item.dropoff_location}
                                                   type={'Schedule'}
                                               />
                                                    </TouchableOpacity>
            ))
        ) 
        
        : null}




</ScrollView>
</SafeAreaView>

    )
};

export default Orders;