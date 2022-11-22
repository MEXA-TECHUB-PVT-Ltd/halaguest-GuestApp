
////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

export const GetAcountDetailhere = async () => {
    console.log('check permission function call');
     return GetAcountDetailhere();
  };

  export const GetAcountDetail=async() => {
    var user= await AsyncStorage.getItem('Userid')
    console.log("order request function",user)

    await axios({
      method: 'GET',
      url: BASE_URL+'api/hotel/specificHotel/'+user,
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
      if(response.data != '')
      {
        return 0
      }
      else{
        return response
      }
   
   
    //   setName(response.data[0].img)
    //   setEmail(response.data[0].hotel_name)
    //   setCity(response.data[0].city)
    //   setCountry(response.data[0].country)
    //   setState(response.data[0].state)
    //   setZipcode(response.data[0].zip_code)
    //   setStreet_address(response.data[0].street_address)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }