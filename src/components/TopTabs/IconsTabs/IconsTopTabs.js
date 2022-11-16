import * as React from 'react';
import {View,Text,ActivityIndicator,Image} from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';
import Colors from '../../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';


import { IconButton } from 'react-native-paper';

import { fontFamily } from '../../../constant/fonts';

import { appImages } from '../../../constant/images';

const IconsTopTabs = (props) => {

    return(
<View style={{
                        alignItems:'center',justifyContent:'center',             
width:wp(props.width)
}}>
           <IconButton
                icon={props.icon}
                iconColor={props.state===true?Colors.Appthemeorangecolor:'grey'}
                size={30}
      
              />

                        <Text style={{
                            color:props.state===true?Colors.Appthemeorangecolor:'#AAAAAA',
                        fontWeight:"400",fontSize:hp(1.7),
                        fontFamily:fontFamily.Poppins_Regular,
                        }}>
                            {props.title}</Text>

                            <View style={{height:hp(0.7),width:wp(props.width),
                            marginTop:hp(1.5),
                            backgroundColor:props.state===true?Colors.Appthemeorangecolor:'#AAAAAA',
                            borderRadius:wp(2)}}>

                            </View>
                        </View>
    )
};

export default IconsTopTabs;