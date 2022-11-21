import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, FlatList, StatusBar, ImageBackground,BackHandler,
    ScrollView,
    Image, View, Text, TouchableOpacity, TextInput,ActivityIndicator
} from 'react-native';

////////////////////app pakages//////////////
import { Checkbox } from 'react-native-paper';

//////////////////app icons////////////////
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomTopTabs from '../../../components/TopTabs/CustomTopTabs';
import IconsTopTabs from '../../../components/TopTabs/IconsTabs/IconsTopTabs';
import DashboardHeader from '../../../components/Header/DashboardHeade';
import ViewAll from '../../../components/ViewAll/ViewAll';
import GuestCards from '../../../components/CustomCards/GuestCards/GuestCards';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import CustomCards from '../../../components/CustomCards/CustomCards';

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

const CompleteOrders1 = [
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
  const ScheduleOrders1 = [
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

const Orders = ({ navigation }) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

      /////////////main menu status states/////////////
      const [Schedule, setSchedule] = useState(true)
      const [Complete, setComplete] = useState(false)


            /////////////main menu status states/////////////
    const [ScheduleOrders, setScheduleOrders] = useState('')
        const GetScheduleOrders = async () => {

            axios({
                method: 'GET',
                url: BASE_URL + 'api/Order/hotelOrdersScheduled/63636a39fdb2d73b27d198f8',
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setScheduleOrders(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
                /////////////main menu status states/////////////
                const [CompleteOrders, setCompleteOrders] = useState('')
                const GetCompleteOrders = async () => {
        
                    axios({
                        method: 'GET',
                        url: BASE_URL + 'api/Order/hotelOrdersCompleted/63636a39fdb2d73b27d198f8',
                    })
                        .then(async function (response) {
                            console.log("list data here ", response.data)
                            setCompleteOrders(response.data)
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        })
                    }
            

    useEffect(() => {
        GetScheduleOrders()
        GetCompleteOrders()
      
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
            <CustomHeader
          headerlabel={'Orders'}

        />
              <View style={[TopTabstyles.TopTabView,{paddingHorizontal:wp(10)}]}>
                <TouchableOpacity onPress={() => { setSchedule(true), setComplete(false) }}>
                    <IconsTopTabs
                        title={'Schedule'}
                        icon={appImages.Schedule}
                        width={'25%'}
                        state={Schedule}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                        setSchedule(false), setComplete(true)
                }}>
                    <IconsTopTabs
                        title={'Completed'}
                        icon={appImages.Completed}
                        width={'25%'}
                        state={Complete}
                    />
                </TouchableOpacity>
            </View>
        {Schedule ? (

ScheduleOrders1 === ''?null:

ScheduleOrders1.slice(0, 3).map((item, key) => (
    <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Schedule'})}>
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
                                   </TouchableOpacity>
))
        ) : Complete ? (
            CompleteOrders1 === ''?null:

            CompleteOrders1.slice(0, 3).map((item, key) => (
                <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Completed'})}>
            <OrdersCards
                                                  
                                                //   time={item.flight_time}
                                                //    price={item.total_amount+'$'}
                                                //    pickupLoc={item.pickup_location}
                                                //    dropoffLoc={item.dropoff_location}
                                                   time={'00:00 pm'}
                                                   date={'01/01/2022'}
                                                   type={'Schedule'}
                                                   price={'200'+'$'}
                                                   pickupLoc={'Pickup location here'}
                                                   dropoffLoc={'Drop off location here'}
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