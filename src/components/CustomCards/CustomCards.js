import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';
import {
    Avatar,
} from 'react-native-paper';

import { BASE_URL } from '../../utills/ApiRootUrl';

const CustomCards = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.topview}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-around'
                }}>
                    <Avatar.Image
                    source={{uri:props.companylogo}}
                       // source={require('../../assets/card/cardimage.png')}
                        size={50}
                        style={{backgroundColor:Colors.appgreycolor}}
                    />
                    <View style={{
                        justifyContent: "center", alignContent: 'center',
                        marginLeft: 10
                    }}>
                        <Text style={styles.useritemtext}>{props.companyname}
                        </Text>

                        {/* <Text style={styles.itemtext}>Sent : 10:44:45 </Text> */}
                        <Text style={styles.itemtext}>{props.companydetail} </Text>

                    </View>
                </View>
                <View style={{
                    backgroundColor: props.datestatus === 'Longterm' ? 'red' : null,
                    alignItems: 'center', height: wp(7), justifyContent: 'center'
                    , borderRadius: 20,
                    width: wp(24)
                }}>
                    <Text style={styles.cardtext}>
                        {props.date}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(1.5) }}>
                <Text style={styles.useritemtext}>Buy Target</Text>
                <Text style={styles.cardrowtext}>{props.buytarget}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(1.5) }}>
                <Text style={styles.useritemtext}>Stop Loss</Text>
                <Text style={styles.cardrowtext}>{props.stoploss}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(2.5) }}>
                <Text style={styles.useritemtext}>Sell Targets</Text>
                <Text style={styles.cardrowtext}>{props.selltarget}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(1.5) }}>
                <Text style={styles.useritemtext}>Max Gain</Text>
                <Text style={styles.cardrowtext}>{props.maxgain}</Text>
            </View>
            <View style={{ marginTop: hp(1.5) }}>
                <Text style={styles.useritemtext}>Add Notes</Text>
                {/* <Text style={styles.notetext}>{props.note}</Text> */}
            </View>
        </View>

    )
};

export default CustomCards;