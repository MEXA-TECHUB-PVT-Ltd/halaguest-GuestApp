import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView, KeyboardAvoidingView,
  Image, View, Text, TouchableOpacity,ScrollView
} from 'react-native';

///////////////app pakages/////////////
import DashedLine from 'react-native-dashed-line';

//////////////////app components///////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../components/Button/CustomButton';

//////////////map////////////////
import MapView from 'react-native-maps';

///////////////////app icons////////////////////////
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////////app styles///////////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

    ////////////////app images////////////////
    import { appImages } from '../../../constant/images';


const OrderDetail = ({ navigation,route ,userid}) => {
console.log('data here',route.params)
  // rbsheets states
  const refRBSheet = useRef();

  //rbsheets conteent states
  const [canceltype, setcanceltype] =useState('');
const [radiovalue, setradiovalue] =useState('');

  //order detail data states and apin function
  const [GuestPic,setGuestPic]=useState('')
  const [GuestName,setGuestName]=useState('')
  const [FlightDate,setFlightDate]=useState('')
  const [FlightTime,setFlightTime]=useState('')
const [EstimatedAmount, setEstimatedAmount]=useState('')
const [Comision, setComision]=useState('')
const [CarPrice, setCarPrice]=useState('')
const [TotalAmount, setTotalAmount]=useState('')
const [DriverNotes, setDriverNotes]=useState('')

  const GetOrderDetail=async() => {
    console.log("order request function",)
    await axios({
      method: 'GET',
      url: BASE_URL+'api/Order/specificOrder/'+route.params.orderid,
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
      setGuestPic(response.data[0].img)
      setGuestName(response.data[0].name)
      setFlightDate(response.data[0].flight_date)
      setFlightTime(response.data[0].flight_time)
      setEstimatedAmount(response.data[0].estimated_amount)
      setComision(response.data.img)
      setCarPrice(response.data[0].car_type_id.price)
      setTotalAmount(response.data[0].total_amount)
      setDriverNotes(response.data[0].driver_notes)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }


    useEffect(() => {
     
   setTimeout(() => {
    GetOrderDetail()
},1000);
   
    },[]);
  return (
    <SafeAreaView style={styles.container}>
             <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

      <CustomHeader
          headerlabel={'Order Details'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
        <View style={styles.ordertopview}>
        <Text style={styles.ordertoptext}>Order # 234</Text>
        </View>


   <View style={{marginHorizontal:wp(5)}}>
   <View style={styles.userdetail}>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        <Image  
     source={require('../../../assets/dataimages/user.png')}
    //  source={{uri: BASE_URL+
    //     orderAssignedTo.image}}
     style={{height:50,width:50,borderColor:Colors.activeinputs,
    borderWidth:2,borderRadius:40  }}
     />

        <Text style={styles.usernametext}>Customer Name
          {/* {GuestName} */}
          </Text>
        </View>


       <TouchableOpacity style={[styles.status,{backgroundColor:route.params.navplace ==='Schedule'?Colors.Appthemeorangecolor:'#00D640'}]}>
        <Text style={styles.statustext}>{route.params.navplace ==='Schedule'?"Scheduled":"Completed"}</Text>
       </TouchableOpacity>
       </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Flight Date</Text>
    <Text style={styles.detailtextright}>
    01/01/2022{FlightDate}</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Flight Time</Text>
    <Text style={styles.detailtextright}>10:00 am{FlightTime}</Text>
   </View>
   <View style={styles.lineview}></View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Estimate Amount</Text>
    <Text style={styles.detailtextright}>
    300 ${EstimatedAmount}</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Comission</Text>
    <Text style={styles.detailtextright}>
    300 $</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Car Price</Text>
    <Text style={styles.detailtextright}>
    300 ${CarPrice}</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Total Amount</Text>
    <Text style={styles.detailtextright}>
    300 ${TotalAmount}</Text>
   </View>
   <View style={styles.lineview}></View>
   <View style={{marginTop:hp(3)}}>
   <Text style={styles.detailtextleft}>Driver Notes</Text>
<View style={{
marginBottom:'2%'}}>
<Text style={styles.notestext}>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
 sed diam nonumy eirmod tempor invidunt ut labore et dolore
  magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea {DriverNotes}</Text>
</View>
   </View>
   <Text style={styles.detailtextleft}>Locations</Text>
   {/* <Text style={styles.locationtext}>Pickup to Dropoff Location</Text> */}
   <TouchableOpacity>

   <View style={{ }}>
   <View style={{flexDirection:'row',marginLeft:10,marginBottom:5,alignItems:'center'
//backgroundColor:'yellow'
}}>
    <Ionicons name='location' color={Colors.Appthemeorangecolor} size={25}></Ionicons>
<Text style={styles.subtext}>
East 46th Street, New York Pizza, Italian
</Text>
</View>
<View style={{height:hp(15),width:wp(70),alignItems:'center'}}>

<MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
</View>

      {/* <DashedLine axis='vertical' dashLength={5} color={'red'} style={{ paddingLeft:wp(5), height:hp(4) }} /> */}

<View style={{flexDirection:'row',margin:10,marginTop:25,marginBottom:2,alignItems:'center'
//backgroundColor:'yellow'
}}>
    <Ionicons name='location' color={Colors.BottomTabcolor}  size={25}></Ionicons>
<Text style={styles.subtext}>
East 46th Street, New York Pizza, Italian
</Text>

</View>
<View style={{height:hp(15),width:wp(70),alignItems:'center'}}>

<MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
</View>
</View>
</TouchableOpacity>

   </View>
 {  route.params.navplace ==='Schedule'?
<View style={{height:hp(20)}}>
<CustomButtonhere
            title={'TRACK TRIP'}
            widthset={78}
            topDistance={10}
            onPress={() => 
             {
              //dispatch(setPhoneNumber(number)),
              //navigation.navigate('Verification',{Phonenumber:number})}
              navigation.navigate('TripRoute')}
            }
          />
</View>
:null
}
      </ScrollView>
    </SafeAreaView>
  )
};

export default OrderDetail;