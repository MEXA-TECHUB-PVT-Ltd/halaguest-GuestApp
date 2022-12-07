import React, {useState,useEffect} from 'react';
import { 
    View,  Text,  TouchableOpacity,   StatusBar,  ScrollView,
} from 'react-native';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

////////////////app components//////////////
import SettingsMenu from '../../../components/SettingsView/SettingsMenu';
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

     ////////////isfocused//////////
     const isfocussed = useIsFocused()
  
              ///////////////data states////////////////////
  const [username, setUserName] = React.useState();
  const [userimage, setUserImage] = React.useState();
  const [userdesc, setUserDesc] = React.useState();
  const [useremail, setUseremail] = React.useState();
  const [usercity, setUsercity] = React.useState();
    const GetAcountDetail=async() => {
      var user= await AsyncStorage.getItem('Userid')
      console.log("order request function",user)
  
      await axios({
        method: 'GET',
        url: BASE_URL+'api/guest/specificGuest/'+user,
      })
      .then(function (response) {
        console.log("response get here dispatcher", JSON.stringify(response.data))
        setUserImage(response.data[0].img)
        setUserName(response.data[0].name)
        setUserDesc(response.data[0].details)
        setUsercity(response.data[0].city)
        setUseremail(response.data[0].email)
      })
      .catch(function (error) {
        console.log("error", error)
      })
      }
        useEffect(() => {
          if (isfocussed) {
          GetAcountDetail()
          }
        }, [isfocussed]);
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
                              <View style={{marginTop:hp(28),
                    marginBottom:hp(2)}}>
               {/* <SettingsMenu
       label={'Payment Details'}
       labelPress={()=>navigation.navigate('ViewPaymentDetail')}
       /> */}
                  <SettingsMenu
       label={'UpdateProfile'}
       labelPress={()=>navigation.navigate('UpdateProfile')}
       />
                  <SettingsMenu
       label={'Contact Us'}
      // labelPress={()=>navigation.navigate('UpdateDocumentsDetail')}
       />

                    </View>
             {/* <ScrollView
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

            </ScrollView> */}
        </View>
        <View style={{position:'absolute',top:hp(10),alignItems:'center',alignSelf:'center'}}>
            <ProfileCard
                               userlogo={{uri:BASE_URL+userimage}}
                               username={username}
                               usercity={usercity}
                               useremail={useremail}
                               userdesc={userdesc}
            />
          </View>
      </View>
    );
};

export default Profile;
