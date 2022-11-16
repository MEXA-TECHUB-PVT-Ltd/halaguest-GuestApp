import * as React from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';
import Colors from '../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const BadgeView = (props) => {
  console.log('props',props)
    return(
<View style={styles.container}>
<View style={{backgroundColor:props.state===true?Colors.Appthemecolor:'white',
                        alignItems:'center',height:wp('9%'),justifyContent:'center'
,                        borderRadius:20,
width:wp(props.width)
}}>
                        <Text style={{color:props.state===true?'white':'black'
                        ,fontWeight:"800",fontSize:hp('1.6%')}}>
                            {props.title}</Text>
                        </View>
  </View>
    )
};

export default BadgeView;