import React, { useEffect, useState,useRef } from 'react';
import {View,Text,TouchableOpacity,Image,FlatList} from 'react-native';

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
import {setStateName,setStateId } from '../../../redux/actions';

  //////////////////////////app api/////////////////////////
  import axios from 'axios';

  ////////////////app Images////////////////
  import { appImages } from '../../../constant/images';

const StateDropDown = (props) => {

    ////////////isfocused//////////
    const isfocussed = useIsFocused()

    /////////////redux states///////
    const { country_id} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata, setdddata] = useState(1)

  ///////////////CarCondition function///////////////
    const GetState =async () => {
        axios({
          method: 'POST',
          url: 'http://teamsuit.co/GlobalCountry/api/states/getById.php',
          data: {
            country_id:country_id
          },
        })
          .then(function (response) {
            setdddata(response.data)
            console.log('flatlist data:', dddata)
          })
          .catch(function (error) {
            console.log("error", error)
          })
      }
      useEffect(() => {
        if(isfocussed)
        {
            GetState()
        }
          }, [isfocussed,country_id]);
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
          <Text style={styles.bottomsheettext}>Select State</Text>
        </View>

        {dddata!=1 && country_id===''?
      <View style={{alignItems:'center',justifyContent:'center',
      marginTop:hp(20)}}>
         <Image
                 source={appImages.ExclaimCircle}
                    style={styles.iconstyle}
                    resizeMode='contain'
                />
      <Text style={{color:'black',fontSize:hp(2.5)}}>
Please First Select Country
      </Text>
  </View>
  :
        <FlatList
          data={dddata}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
            onPress={() =>
              {
                dispatch(setStateName(item.name)),
                dispatch(setStateId(item.state_id)),
                props.refRBSheet.current.close()
              }}
             >
            <View style={styles.card}>
                <Text style={styles.cardtext}>
                  {item.name}{dddata.length}
                </Text>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          extraData={country_id}
          //onRefresh={true}
        />
            }

        </RBSheet>
    )
};

export default StateDropDown;