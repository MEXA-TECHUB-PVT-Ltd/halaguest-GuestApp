import React, {useState,useEffect} from 'react';
import { 
    View,  Text,  TouchableOpacity,   StatusBar,  ScrollView,
} from 'react-native';

/////////////////////app icons//////////////////////
import Icon from 'react-native-vector-icons/Ionicons';

////////////////app components//////////////
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import CustomHeader from '../../../components/Header/CustomHeader';
import ProfileCard from '../../../components/CustomCards/ProfileCard/Profile';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

///////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';

//////////////////app images///////////
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
const Profile = ({navigation}) => {

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
        useEffect(() => {
            GetOrders()
        }, []);
    return (
      <View style={styles.container}>
         
          <StatusBar backgroundColor='white' barStyle="dark-content"/>

        <View style={styles.header}>
        <CustomHeader
          headerlabel={'Profile'}
        //   iconPress={() => { navigation.goBack() }}
        //   icon={'chevron-back'}
          onpresseacrh={() => navigation.navigate('Settings')}
          searchicon={'settings'}
        />
        </View>
        <View 
            style={[styles.footer]}
        >
             <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                    <View style={{marginTop:hp(28),
                    marginBottom:hp(2)}}>
                                <Text style={styles.text_footer}>Trips</Text>
                    </View>
     
             {Orderss === ''?null:
Orderss.map((item, key) => (
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
        </View>
        <View style={{position:'absolute',top:hp(10),alignItems:'center',alignSelf:'center'}}>
            <ProfileCard
                               userlogo={appImages.ProfileUser}
                               username={'Username'}
                               usercity={'Chicago'}
                               useremail={'example@gmail.com'}
                               userdesc={'Lorem ipsum dolor sit amet,'+ 
                              ' consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et '+
                               'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo '+
                               'dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem '+
                               'ipsum dolor sit amet. Lorem ipsum dolor sit amet, '+
                               'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna'}
            />
          </View>
      </View>
    );
};

export default Profile;
