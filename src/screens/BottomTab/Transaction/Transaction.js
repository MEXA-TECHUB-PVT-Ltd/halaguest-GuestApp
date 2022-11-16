import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, StatusBar,
    ScrollView,
    TouchableOpacity, ActivityIndicator
} from 'react-native';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace} from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';

/////////////////app images///////////
import { appImages } from '../../../constant/images';



const Transaction = ({ navigation }) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();


            /////////////main menu status states/////////////
    const [Transaction, setTransaction] = useState('')
        const GetTransaction = async () => {

            axios({
                method: 'GET',
                url: BASE_URL + 'api/Order/hotelOrdersScheduled/63636a39fdb2d73b27d198f8',
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setTransaction(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
            

    useEffect(() => {
        GetTransaction()
      
    }, []);

    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Transaction History'}

        />

{Transaction===""?null:
Transaction.map((item, key) => (
    <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Schedule'})}>
<OrdersCards
                                      
                                      time={item.flight_time}
                                       price={item.total_amount+'$'}
                                       pickupLoc={item.pickup_location}
                                       dropoffLoc={item.dropoff_location}
                                   />
                                   </TouchableOpacity>
))
}

      
   
</ScrollView>
</SafeAreaView>

    )
};

export default Transaction;