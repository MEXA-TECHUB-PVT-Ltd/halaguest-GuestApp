import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, FlatList,TextInput,ScrollView,
  Image, View, Text, TouchableOpacity, StatusBar, ImageBackground
} from 'react-native';
import {
  Avatar,
} from 'react-native-paper';

////////////////////app components////////////////
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////////app pakages////////////////////////
import { Rating, AirbnbRating } from 'react-native-ratings';

//////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Authstyles from '../../../styles/GlobalStyles/Authstyles';
import Authtextstyles from '../../../styles/GlobalStyles/Authtextstyles';
import Logostyles from '../../../styles/GlobalStyles/Logostyles';
import Multilineinputstyles from '../../../styles/GlobalStyles/Multilineinputstyle';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';


//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////app images///////////////
import { appImages } from '../../../constant/images';

const Rattings = ({ navigation,route }) => {
console.log("doctor data here in reviews:", route.params)

 //Modal States
 const [modalVisible, setModalVisible] = useState(false);
 const [modalVisible1, setModalVisible1] = useState(false);

  ///////////////textfields//////////////////
  const [Username, setusername] = useState('');
  const [Email,  setEmail] = useState('');
  const[image,setImage]=useState()
  
//////////////////get dtatapi function////////////
  const GetProfileData= async() => {
    var user= await AsyncStorage.getItem('Userid')
    console.log("userid:",user)
    axios({
      method: 'GET',
      url:BASE_URL+"doctor/get-doctor?_id="+route.params.doctorid
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
   /////////////setuserprofile data//////////
   setusername(response.data.username)
   setEmail(response.data.email)
   setImage(BASE_URL+response.data.image)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }
      useEffect(() => {
     
         // GetProfileData()
    },[]);

    ////////////add stsates////////
    const [Reviews, setReviews] = useState('');
    const [ratting, setRatting] = useState(4.5);

    ////////////////post review function//////////////
    const AddReviews=async() => {
      var user= await AsyncStorage.getItem('Userid')
      console.log("userid:",user)
      console.log('here......',)
      axios({
        method: 'POST',
        url: BASE_URL+'rating/add-rating',
        data:{
          doctorId: route.params.doctorid,
          rating: ratting,
          review: Reviews,
          userId: user
        },
      })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data)) 
   setModalVisible(true)        //alert('Appointment Accepted')
      })
      .catch(function (error) {
        if(error)
      {    
         console.log('Issue in Appoinments Acceptence')
setModalVisible1(true)

        }
    
        console.log("error", error)
      })
    }

  const  ratingCompleted=(rating)=> {
      console.log("Rating is: " + rating)
      setRatting(rating)
    }
  return (

    <SafeAreaView style={styles.container}>
              <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
       <View 
     style={[styles.Logoview]}
        >
          <Image
            source={appImages.Rattings}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
<View style={styles.textview}>
            <Text style={styles.toptext}>Order Completed</Text>
          </View>

 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
 <Avatar.Image

           source={appImages.ProfileUser}
            size={wp(15)}
            style={{backgroundColor:Colors.appgreycolor}}
        />
                 <Text style={styles.hoteltext}>Hotel Name</Text>
 </View>
 <View style={{alignItems:'center',alignSelf:'center',marginTop:hp(3)}}>
 <Rating
  type='star'
  ratingCount={5}
  imageSize={30}
  //showRating
  onFinishRating={ratingCompleted}
/>
 </View>

      <View style={[Multilineinputstyles.action, { height: wp(35), marginTop: wp('3%'),width:wp(85),backgroundColor:'white',
      borderColor:Colors.border,borderWidth:1
     }]}>
            <TextInput
              // ref={ref_input6}
              placeholder="Add Comment"
              //onChangeText={setReach}
              placeholderTextColor={Colors.inputtextcolor}
              multiline={true}
              style={[Multilineinputstyles.input,{backgroundColor:'white',}]}
            />
         
              </View>
              <Text style={styles.detailtext}>Order Details</Text>
              <View style={styles.detailview}>
    <Text style={styles.detailtextleft}> Amount</Text>
    <Text style={styles.detailtextright}>
    200 $</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Comission</Text>
    <Text style={styles.detailtextright}>
    10 $</Text>
   </View>
   <View style={styles.lineview}></View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Total Amount</Text>
    <Text style={styles.detailtextright}>
    210 $</Text>
   </View>
   <View style={{height:hp(20)}}>
   <CustomButtonhere
            title={'SUBMIT'}
            widthset={78}
            topDistance={10}
            onPress={() => 
             {
              navigation.navigate('BottomTab')}
            }
          />
   </View>
                          <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Reason Submitted'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false)}}
                /> 
                </ScrollView>
    </SafeAreaView>

  )
};

export default Rattings;