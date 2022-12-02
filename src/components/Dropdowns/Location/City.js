import React, { useEffect, useState,useRef } from 'react';
import {View,Text,TouchableOpacity,FlatList,Image} from 'react-native';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

////////////app styles//////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setCityName,setCityId } from '../../../redux/actions';

  //////////////////////////app api/////////////////////////
  import axios from 'axios';

////////////////app images//////////////
import { appImages } from '../../../constant/images';

const CityDropDown = (props) => {

    ////////////isfocused//////////
    const isfocussed = useIsFocused()

    /////////////redux states///////
    const {state_id} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata, setdddata] = useState(1)

  ///////////////CarCondition function///////////////
    const GetCity =async () => {

        axios({
          method: 'POST',
          url: 'http://teamsuit.co/GlobalCountry/api/cities/getByStateId.php',
          data: {
            state_id:state_id
          },
        })
          .then(function (response) {
            setdddata(response.data)
          })
          .catch(function (error) {
            console.log("error", error)
          })
      }
      useEffect(() => {
        if(isfocussed)
        {
        GetCity()
        }
          }, [isfocussed,state_id]);
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
             height:hp(90),
             maxHeight:hp(90),
          }
        }}>
        <View style={{
          flexDirection: 'row', justifyContent: "space-between",
          marginHorizontal: 0
        }}>
          <Text style={styles.bottomsheettext}>Select City</Text>
        </View>
{dddata!= 1&& state_id===''?
      <View style={{alignItems:'center',justifyContent:'center',
      marginTop:hp(20)}}>
         <Image
                 source={appImages.ExclaimCircle}
                    style={styles.iconstyle}
                    resizeMode='contain'
                />
      <Text style={{color:'black',fontSize:hp(2.5)}}>
Please First Select State
      </Text>
  </View>
  :
  <FlatList
  data={dddata}
  renderItem={({ item, index, separators }) => (
    <TouchableOpacity
    onPress={() =>
      {
        dispatch(setCityName(item.name)),
        dispatch(setCityId(item.id)),
        props.refRBSheet.current.close()
      }}
     >
    <View style={styles.card}>
        <Text style={styles.cardtext}>
          {item.name}
        </Text>
    </View>
    </TouchableOpacity>
  )}
  keyExtractor={item => item.id}

/>

}


        </RBSheet>
    )
};

export default CityDropDown;