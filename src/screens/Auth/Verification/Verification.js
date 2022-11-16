import React, { useEffect, useState } from 'react';
import {
    Image, View, Text, SafeAreaView,ScrollView,TouchableOpacity,
} from 'react-native';
///////////////app images//////////////
import { appImages } from '../../../constant/images';

/////////////////app components/////////////////
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';

/////////////////app icons////////////
import AntDesign from 'react-native-vector-icons/AntDesign';

/////////////////////app styles/////////////////////
import Authtextstyles from '../../../styles/GlobalStyles/Authtextstyles';
import Logostyles from '../../../styles/GlobalStyles/Logostyles';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

///////////////app code fields/////////////
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

  ///////////////timer/////////////////////
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


const Verification = ({ navigation,route }) => {
  console.log("obj:",route.params)

    /////////////previous data state///////////////
    const [predata] = useState(route.params);
    
      //Modal States
      const [modalVisible, setModalVisible] = useState(false);

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);
  
  //////////time function//////////
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return `${minutes}:${seconds}`
  }


   //code Confirmation states
 const [value, setValue] = useState();
//cell number
  const CELL_COUNT = 6;

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

 //button states
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);

 //check OTP Code
 const verifyno =()=>{
  console.log("obj:",route.params.otp  ,value )
  if(route.params.otp == value)
  {
    navigation.navigate('NewPassword',value)
  }
  else{
    alert('Wrong Code, Enter the right Code')
    console.log("not click")
  }
}

//code set in state
  const getcode=()=>{
    console.log("obj:",route.params)
    //setValue(route.params)
  }

  useEffect(() => {

    getcode()
  
  },[]);
  return (
    <SafeAreaView style={styles.container}>
<TouchableOpacity onPress={()=> navigation.goBack()}>
        <View style={{width:wp(5),marginLeft:wp(8)}}>
                <Image
                 source={appImages.backicon}
                    style={{height:hp(2.5),width:wp(6)}}
                    resizeMode='contain'
                />
            </View>
            </TouchableOpacity>
      
            <View 
     style={[Logostyles.Logoview]}>
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode='contain'
          />
        </View>
<View style={Authtextstyles.textview}>
            <Text style={Authtextstyles.toptext}>Verification</Text>
            <Text style={Authtextstyles.subtext}>Please enter code that you received on your phone number
            </Text>
          </View>
        <View style={styles.Cellview}>
        <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        //style={styles.input}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : '0')}
          </Text>
        )}
      />
      </View>
      <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:"center",
      //backgroundColor:'red',
      width:wp(90),alignSelf:'center',marginTop:hp(2),
   // paddingHorizontal:wp(6)
    }}>
  <View style={{justifyContent:'flex-start',alignSelf:'flex-start'}}>
  {
  disabletimer==true?
<CountdownCircleTimer
size={50}
strokeWidth={0}
children ={children}
    isPlaying
    duration={7}
    initialRemainingTime={15}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    onComplete={() => {
      setdisableTimer(false)
      // do your stuff here
      //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
    }}
  >

    {({ remainingTime }) =>
    
    <Text style={{color:'black',fontSize:hp(2)}}>{remainingTime}(s)</Text>}
  </CountdownCircleTimer>
  :
  null
 } 
  </View>
<TouchableOpacity 
disabled={disabletimer}
      onPress={()=> setdisableTimer(true)}    
      style={{marginLeft:wp(8)}}                       
       >
<Text style={styles.Cellmaintext}>Resend Code</Text>
</TouchableOpacity>
      </View>
<View style={styles.buttonview}>
          <CustomButtonhere
            title={'Verify'}
            widthset={'70%'}
            topDistance={0}
            //onPress={() => verifyno()}
            onPress={()=>   
              setModalVisible(true)  
              //navigation.navigate('CreateAccount',predata)
            }
          /></View>
          <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Account Verified Successfully'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),navigation.navigate('BottomTab')}}
                /> 
</SafeAreaView>

  )
};

export default Verification;