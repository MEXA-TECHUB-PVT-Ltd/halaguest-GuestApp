import React, { useEffect, useState, useRef } from 'react';
import {
 StatusBar, ImageBackground,SafeAreaView,ScrollView,
    Image, View, Text, TouchableOpacity, TextInput
} from 'react-native';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../components/Button/CustomButton';
import HotelTypes from '../../../components/Dropdowns/HotelTypes';

//////////////app pakages//////////////////
import ImagePicker from 'react-native-image-crop-picker';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge } from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

/////////////////////height width pakage/////////////////////
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';
import Multilineinputstyles from '../../../styles/GlobalStyles/Multilineinputstyle';

/////////////////app images///////////
import { appImages } from '../../../constant/images';


const UpdateProfile = ({ navigation,route }) => {
console.log('previous data:', route.params)

    ////////////prevous data States///////////////
    const [predata] = useState(route.params);

   //////////////link dropdown////////////////
   const refddRBSheet = useRef();

    //camera and imagepicker
  const refRBSheet = useRef();

  ///////////picker state/////////
  const [image, setImage] = useState('')

  //////////////////////cameraimage//////////////////
  const takePhotoFromCamera = () => {

    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      refRBSheet.current.close()
      console.log(image);
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1)
      }
      Uploadpic(newfile)

    });
  }
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      refRBSheet.current.close()
      console.log(image);
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1)
      }
      Uploadpic(newfile)
    });
  }

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    const { hoteltype,phone_no } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

             /////////TextInput References///////////
             const ref_input2 = useRef();

             const [selectedimage, setselectedimage] = useState(false);
                   /////////////////image api calling///////////////
      const Uploadpic =(props)=>{
console.log("here url", BASE_URL + 'upload-image')
        RNFetchBlob.fetch('POST',
        BASE_URL + 'upload-image',
        {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        }, [
        // part file from storage
        {
          name: 'image', filename: 'avatar-foo.jpg', type: 'image/png',
          data: RNFetchBlob.wrap(props.uri)
        }
      ]).then((resp) => {
        console.log('here Profile image:',resp.data)
        setselectedimage(JSON.parse(resp.data))
       // CreateUserProfile(resp.data)
      }).catch((err) => {
        console.log('here error:',err)
      })
  
      }

  ///////////////data states////////////////////
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [gender,  setGender] = React.useState();
  const [city,  setCity] = React.useState();
  const [state,  setState] = React.useState();
  const [zipcode,  setZipcode] = React.useState();
  const [country,  setCountry] = React.useState();
  const [street_address,  setStreet_address] = React.useState();

 //////////////////////Api Calling/////////////////
 const Createuser = async() => {
  var user= await AsyncStorage.getItem('Userid')
  var date=new Date()
  console.log("userid:",date,selectedimage)

    axios({
      method: 'POST',
      url: BASE_URL + 'api/hotel/createHotel',
      data: {
        hotel_name: hoteltype,
        img: selectedimage,
        email: email,
        city: city,
        state: state,
        zip_code: zipcode,
        country: country,
        street_address: street_address,
        name: name,
        phoneNo: phone_no,
        created_at:date,
        status: 'block',
        device_token: '354ref' 
      },
    })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data))
        // if (response.data === "Email Already Exist") {
        //   setloading(0);
        //   setdisable(0);
        //   alert("Email Already Exist,Enter other email")
        // }
        // else {
        //   setloading(0);
        //   setdisable(0);
        //   navigation.navigate('Subscribe', response.data)
        // }


      })
      .catch(function (error) {
        console.log("error", error)
      })
  }

    useEffect(() => {
    }, []);

    return (
      <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.container}> 
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
                headerlabel={'Update Profile'}
                iconPress={() => { navigation.goBack() }}
                icon={'chevron-back'}

            />  
<TouchableOpacity onPress={()=> refRBSheet.current.open()}>
<View style={styles.userimage}>
{image != '' ?
                  <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode='contain'
                  />
                :
            <Image
            source={appImages.User}
            style={{ width: wp(12), height: hp(8),
             }}
             resizeMode='contain'
          />
              }
          <Image
            source={appImages.Camera}
            style={{ width: wp(10), height: hp(5),position:"absolute",bottom:0,right:0
             }}
             resizeMode='contain'
          />
</View>
</TouchableOpacity>
<View style={Inputstyles.inputview}>
  <Text style={Inputstyles.inputtoptext}>Name</Text>
  <TouchableOpacity onPress={()=> refddRBSheet.current.open()} >
  <View style={Inputstyles.action}>
            <TextInput
            value={hoteltype}
              //placeholder="Username Here"
              onChangeText={setName}
              returnKeyType={"next"}
              onSubmitEditing={() => { ref_input2.current.focus() }}
              blurOnSubmit={false}
              autoFocus={true}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
              editable={false}
            />
          </View>
  </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>Email</Text>
          <View style={Inputstyles.action}>
            <TextInput
                  ref={ref_input2}
                  //value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setEmail}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
          <Text style={Inputstyles.inputtoptext}>City</Text>
          <View style={Inputstyles.action}>
            <TextInput
                  ref={ref_input2}
                 // value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setCity}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
          <Text style={Inputstyles.inputtoptext}>State</Text>
          <View style={Inputstyles.action}>
            <TextInput
                  ref={ref_input2}
                 // value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setState}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
          <Text style={Inputstyles.inputtoptext}>Zip_Code</Text>
          <View style={Inputstyles.action}>
            
            <TextInput
                  ref={ref_input2}
                  //value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setZipcode}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
          <Text style={Inputstyles.inputtoptext}>Country</Text>
          <View style={Inputstyles.action}>
            
            <TextInput
                  ref={ref_input2}
                  //value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setCountry}
              placeholderTextColor={Colors.inputtextcolor}
              autoCapitalize="none"
              style={Inputstyles.input}
            />
          </View>
          <Text style={Inputstyles.inputtoptext}>Street Address</Text>
          <View style={Inputstyles.action}>
            
            <TextInput
                  ref={ref_input2}
                  //value={email}
              //placeholder="Example@gmail.com"
              onChangeText={setEmail}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
            />
          </View>
          <Text style={Inputstyles.inputtoptext}>Description</Text>
          <View style={[Multilineinputstyles.action, { height: wp('38%'), marginTop: wp('3%') }]}>
            <TextInput
              // ref={ref_input6}
              //placeholder="Tag Relevant Profession to increase the reach"
              //onChangeText={setReach}
              placeholderTextColor={Colors.inputtextcolor}
              multiline={true}

              style={Multilineinputstyles.input}
            />

          </View>
        </View>
        
        <View style={{ marginBottom: hp(2), 
            marginTop: hp(12) }}>
            <CustomButtonhere
              title={'UPDATE'}
              widthset={'78%'}
              topDistance={0}
              onPress={() => 
                Createuser()
               // navigation.navigate('Drawerroute')
              }
            />
          </View>

        <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'From Gallery'}
        takePhotoFromCamera={takePhotoFromCamera}
        choosePhotoFromLibrary={choosePhotoFromLibrary}
      />
              <HotelTypes
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
          title={'From Gallery'}
        />
    </SafeAreaView>
</ScrollView>
    )
};

export default UpdateProfile;