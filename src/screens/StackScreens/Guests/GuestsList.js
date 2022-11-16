import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, FlatList, StatusBar, ImageBackground,BackHandler,
    ScrollView,
    Image, View, Text, TouchableOpacity, TextInput,ActivityIndicator
} from 'react-native';


//////////////////app icons////////////////
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import GuestCards from '../../../components/CustomCards/GuestCards/GuestCards';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace } from '../../../redux/actions';

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


const GuestsList = ({ navigation }) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();


    ///////////// Get Guests states and API function/////////////
    const [Guests, setGuests] = useState('')

    const GetGuests = async () => {
        axios({
            method: 'GET',
            url: BASE_URL + 'api/guest/allGuests',
        })
            .then(async function (response) {
                console.log("list data here ", response.data)
                setGuests(response.data)
            })
            .catch(function (error) {
                console.log("error", error)
            })
        } 

    useEffect(() => {
        GetGuests()
      
    }, []);

    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Orders'}
          iconPress={() => { navigation.toggleDrawer() }}
          icon={'chevron-back'}
          onpresseacrh={() => navigation.navigate('AddGuests')}
          searchicon={'add-sharp'}
        />

            { Guests === ''?null:
Guests.map((item, key) => (
    <TouchableOpacity onPress={()=>navigation.navigate('GuestsDetail',{guest_id:item._id,navplace:'GuestDetail'})}>
    <GuestCards
                                        guestlogo={item.img}
                                        guestname={item.name}
                                        guestemail={item.email}
                                        guestgender={item.gender}
                                    />
                                    </TouchableOpacity>
))
}
</ScrollView>
</SafeAreaView>

    )
};

export default GuestsList;