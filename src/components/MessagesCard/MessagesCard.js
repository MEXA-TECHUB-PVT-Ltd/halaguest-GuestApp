import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';
import {
    Avatar,
} from 'react-native-paper';

const MessagesCard = (props) => {
    // console.log('props here:', props)
    return (


        <View style={styles.card}>
            <View style={styles.topview}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-around'
                }}>
                    <Avatar.Image
                        source={require('../../assets/card/cardimage.png')}
                        size={50}
                    />
                    <View>
                    <View style={{
                       flexDirection: 'row', justifyContent:'space-between',alignContent: 'center',
                        marginLeft: wp(3)
                    }}>
                        <Text style={styles.useritemtext}>Company Name
                        </Text>
                        <View style={{backgroundColor:props.datestatus==='Longterm'?Colors.Appthemecolor:null,
                        alignItems:'center',height:wp(7),justifyContent:'center'
,                        borderRadius:20,
width:wp(18)
}}>
                <Text style={styles.cardtext}>
                Read
                </Text>
                </View>
                  
                    </View>
                    <View style={{ marginLeft: wp(3),marginTop:hp(0.5)}}>
                    <Text style={styles.itemtext}>{props.message}</Text>
                    {/* <Text style={styles.itemtext}>consetetur sadipscing elitr, sed diam </Text> */}
                    </View>
    
                    </View>
       


                    
                </View>

           
            </View>


        </View>

    )
};

export default MessagesCard;