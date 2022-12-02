import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Avatar} from 'react-native-paper';

////////////////////app components////////////////
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////////app pakages////////////////////////
import {Rating, AirbnbRating} from 'react-native-ratings';

//////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Authstyles from '../../../styles/GlobalStyles/Authstyles';
import Authtextstyles from '../../../styles/GlobalStyles/Authtextstyles';
import Logostyles from '../../../styles/GlobalStyles/Logostyles';
import Multilineinputstyles from '../../../styles/GlobalStyles/Multilineinputstyle';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////Tokens////////////////
import {Driver_DeviceToken} from '../../../utills/ApiRootUrl';

////////////////////app images///////////////
import {appImages} from '../../../constant/images';

const Rattings = ({navigation, route}) => {
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  //order detail data states and apin function
  const [HotelToken, setHotelToken] = useState('');
  ////////////guest////////////////
  const [GuestPic, setGuestPic] = useState('');
  const [GuestName, setGuestName] = useState('');
  ///////////////driver////////////
  const [DriverToken, setDriverToken] = useState('');
  const [DriverId, setDriverId] = useState('');
  const [Driverpic, setDriverPic] = useState('');
  const [DriverName, setDriverName] = useState('');
  ///////////order////////////
  const [OrderNo, setOrderNo] = useState('');
  const [orderid, setOrderId] = useState('');
  const [OrderStatus, setOrderStatus] = useState('');
  const [OrderAmount, setOrderAmount] = useState('');

  const GetOrderDetail = async () => {
    console.log('order request function');
    await axios({
      method: 'GET',
      url: BASE_URL + 'api/Order/specificOrder/' + route.params.orderid,
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
        setGuestName(response.data[0].guest_id.name);
        setGuestPic(response.data[0].guest_id.img);
        ///////////////driver///////
        setDriverToken(response.data[0].driver_id.device_token);
        setDriverId(response.data[0].driver_id._id)
        setDriverPic(response.data[0].driver_id.img);
        setDriverName(response.data[0].driver_id.name);
        ///////order///////////
        setOrderAmount(response.data[0].total_amount);
        setOrderStatus(response.data[0].status);
        setOrderNo(response.data[0].orderNo);
        setOrderId(response.data[0]._id);
        setHotelToken(response.data[0].guest_id.hotel_id[0].device_token);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetOrderDetail();
  }, []);
  ////////////add stsates////////
  const [Reviews, setReviews] = useState('');
  const [ratting, setRatting] = useState(4.5);

  ////////////////post review function//////////////
  const AddReviews = async () => {
    var user = await AsyncStorage.getItem('Userid');
    console.log('userid:', user, ratting, Reviews);
    axios({
      method: 'POST',
      url: BASE_URL + 'api/Rating/createRating',
      data: {
        order_id: route.params.orderid,
        star: ratting,
        review: Reviews,
        //userId: user
      },
    })
      .then(async function (response) {
        console.log('response', JSON.stringify(response.data));
        DriverSendNotification();
        // setModalVisible(true)
      })
      .catch(function (error) {
        if (error) {
          console.log('Issue in Appoinments Acceptence');
          //setModalVisible1(true)
        }

        console.log('error', error);
      });
  };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRatting(rating);
  };

  //////////////////////Notification/////////////////
  const DriverSendNotification = async () => {
    var data = JSON.stringify({
      registration_ids: [DriverToken],
      notification: {
        title: 'Halaguest',
        body: GuestName + ' Rated You',
        mutable_content: true,
        sound: 'Tri-tone',
        color: 'purple',
      },
    });

    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Driver_DeviceToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        SendDBNotification()
   
        // props.CloseModal()
      })
      .catch(function (error) {
        console.log(error);
      });
  };
      //////////////////////Send notification to DB/////////////////
      const SendDBNotification = async () => {
        var user = await AsyncStorage.getItem('Userid');
        var date=new Date()
        console.log('userid:', user,date);
  
        axios({
          method: 'POST',
          url: BASE_URL + 'api/notification/createNotificationId',
          data: {
            to:DriverId,
            from: user,
            detail: GuestName+ ' Rated You ' ,
            created_at: date,
            readStatus: 'false',
            to_table: 'driver',
            from_table: 'guest' 
          },
        })
          .then(function (response) {
            console.log('response', JSON.stringify(response.data));
            setModalVisible(true);
          })
          .catch(function (error) {
            console.log('error', error);
          });
      };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.Logoview]}>
          <Image
            source={appImages.Rattings}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textview}>
          <Text style={styles.toptext}>Order Completed</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Avatar.Image
            //source={appImages.ProfileUser}
            source={{uri: BASE_URL + GuestPic}}
            size={wp(15)}
            style={{backgroundColor: Colors.appgreycolor}}
          />
          <Text style={styles.hoteltext}>{GuestName}</Text>
        </View>
        <View
          style={{alignItems: 'center', alignSelf: 'center', marginTop: hp(3)}}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            //showRating
            onFinishRating={ratingCompleted}
          />
        </View>

        <View
          style={[
            Multilineinputstyles.action,
            {
              height: wp(35),
              marginTop: wp('3%'),
              width: wp(85),
              backgroundColor: 'white',
              borderColor: Colors.border,
              borderWidth: 1,
            },
          ]}>
          <TextInput
            // ref={ref_input6}
            placeholder="Add Comment"
            //onChangeText={setReach}
            placeholderTextColor={Colors.inputtextcolor}
            multiline={true}
            style={[Multilineinputstyles.input, {backgroundColor: 'white'}]}
          />
        </View>
        <Text style={styles.detailtext}>Order Details</Text>
        {/* <View style={styles.detailview}>
    <Text style={styles.detailtextleft}> Amount</Text>
    <Text style={styles.detailtextright}>
    200 $</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Comission</Text>
    <Text style={styles.detailtextright}>
    10 $</Text>
   </View> */}

        <View style={styles.detailview}>
          <Text style={styles.detailtextleft}>Total Amount</Text>
          <Text style={styles.detailtextright}>{OrderAmount} $</Text>
        </View>
        <View style={styles.lineview}></View>
        <View style={{height: hp(20)}}>
          <CustomButtonhere
            title={'SUBMIT'}
            widthset={78}
            topDistance={10}
            onPress={() => {
              AddReviews();
              //navigation.navigate('BottomTab')
            }}
          />
        </View>
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.CheckCircle}
          text={'Ratting Submitted'}
          leftbuttontext={'CANCLE'}
          rightbuttontext={'OK'}
          onPress={() => {
            setModalVisible(false),navigation.navigate('Orders')
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rattings;
