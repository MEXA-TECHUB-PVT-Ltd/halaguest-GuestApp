import React, { useState, useEffect } from "react";
import {
    View,
    Image,
    ImageBackground,
    Text,
    ActivityIndicator
} from "react-native";

/////////////////app components//////////////
import CustomButtonhere from "../../../components/Button/CustomButton";

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  ////////////////////app images////////
import { appImages } from "../../../constant/images";

////////////////app store data//////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////app styles////////////////
import Logostyles from "../../../styles/GlobalStyles/Logostyles";
import Authstyles from "../../../styles/GlobalStyles/Authstyles";

const SplashScreen = ({ navigation }) => {



    return (

        <ImageBackground source={appImages.SplashBG}
        resizeMode="cover" 
        style={{flex:1,alignItems:'center'}}
        >
        <View 
     style={[Logostyles.Logoview,{marginTop:hp(22),marginBottom:hp(4)}]}
        >
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode='contain'
          />
        </View>
        <View style={Authstyles.subtextview}>
          <Text style={Authstyles.subtext}>Find a Best Taxi Ride</Text>
          <Text style={Authstyles.subundertext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
           sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo 
      
          </Text>
        </View>
                 <CustomButtonhere
            title={'Get Started'}
            widthset={78}
            topDistance={15}
            iscolor={'login'}
            onPress={() => 
      {  navigation.navigate('Login')}
            }
          />
 </ImageBackground>

    );
};
export default SplashScreen;