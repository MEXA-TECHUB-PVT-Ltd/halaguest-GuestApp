import React, { useEffect, useState,useRef } from 'react';
import {View,Text,TouchableOpacity,Image,FlatList} from 'react-native';

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

////////////app styles//////////////
import styles from './styles';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setHotelType,setHotelTypeId } from '../../redux/actions';

  //////////////////////////app api/////////////////////////
  import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
  import AsyncStorage from '@react-native-async-storage/async-storage';

const HotelTypes = (props) => {

    /////////////redux states///////
    const { HotelTypes} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

   //////////////HotelTypes dropdown////////////////
   const reflinkddRBSheet = useRef();

  //////////dropdownlink data/////////////
  const [dddata, setdddata] = useState()
  const [ddpickvalue, setddpickvalue] = useState()

  ///////////////HotelTypes function///////////////
    const GetHotelTypes =async () => {
      
        axios({
          method: 'GET',
          url: BASE_URL+'api/hotel/allHotels',
        })
          .then(function (response) {
            // console.log("response", JSON.stringify(response.data))
            setdddata(response.data)
            console.log('flatlist data:', dddata)
          })
          .catch(function (error) {
            console.log("error", error)
          })
      }
      useEffect(() => {
        GetHotelTypes()
          }, []);
    return(
        <RBSheet
        //sstyle={{flex:1}}
        ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        openDuration={50}
        closeDuration={50}
        animationType="fade"
        
        //height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: "white"
          },
          container: {
            borderTopLeftRadius:wp(10),
            borderTopRightRadius:wp(10),
              height:hp(95)
          }
        }}
        
        >
        
        <View style={{
          flexDirection: 'row', justifyContent: "space-between",
          marginHorizontal: 0
        }}>
        
          <Text style={styles.bottomsheettext}>Select Hotel Type</Text>
        
        </View>
        <FlatList
          data={dddata}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
            onPress={() =>
              {
                dispatch(setHotelType(item.hotel_name)),
                dispatch(setHotelTypeId(item._id)),
                props.refRBSheet.current.close()
                //reflinkddRBSheet.current.open()
              }}
             >
            <View style={styles.card}>
            {/* <Image
                 source={{uri:BASE_URL+item.icon}}
                    style={Inputstyles.inputicons}
                    resizeMode='contain'
                /> */}
                <Text style={styles.cardtext}>
                  {item.hotel_name}
                </Text>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        
        />
    
        </RBSheet>
    )
};

export default HotelTypes;