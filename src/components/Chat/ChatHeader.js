import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { appImages } from "../../constant/images";
import Colors from "../../utills/Colors";

import Icon from 'react-native-vector-icons/Ionicons';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

//import { theme } from "../../theme";

const ChatHeader = ({ username, bio, picture, onlineStatus, onPress,viewstate }) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={onPress}>
				<Icon name="chevron-back" size={30} color={'white'} />
			</TouchableOpacity>
			<View style={styles.profileOptions}>
				<View style={styles.profile}>
					<View>
					<Image
                    source={picture}
                    style={styles.image}
                    resizeMode='cover'
                />
						<View style={{position:'absolute',bottom:hp(0.5),right:wp(0)}}>
					<Image
                   	source={appImages.OnlineDot}
                    style={styles.icondot}
                    resizeMode='contain'
                />
					</View>
					</View>
			
					{/* <Image style={styles.image} source={{ uri: picture }} /> */}
					<View style={styles.usernameAndOnlineStatus}>
						<Text style={styles.username}>{username}</Text>
						<Text style={styles.onlineStatus}>{onlineStatus}</Text>
					</View>
			
			
				</View>
		
				{/* {viewstate === true ?
					<View style={styles.options}>
					<TouchableOpacity
						onPress={() => navigation.navigate("OnCallScreen", {
							username: username,
							picture: picture
						})}
						style={{ paddingHorizontal: 5 }}
					>
						<View style={styles.iconview}>
							<Image
                  source={appImages.CheckCircle}
                    style={styles.icon}
                    resizeMode='contain'
                />
				 </View>
					</TouchableOpacity>
					<TouchableOpacity style={{ paddingHorizontal: 20 }}>
					<View style={styles.iconview}>
					<Image
                    source={appImages.CheckCircle}
                    style={styles.icon}
                    resizeMode='contain'
                />
						 </View>
					</TouchableOpacity>
				</View>
				:
				<View style={styles.options}>
				<TouchableOpacity style={{ paddingHorizontal: 20 }}>
				<Image
				 source={appImages.CheckCircle}
				style={styles.icon}
				resizeMode='contain'
			/>
				</TouchableOpacity>
			</View>
			} */}
		
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: 'white',
		paddingTop: hp(0),
		paddingBottom: hp(0),
		backgroundColor:Colors.Appthemecolor,
		alignItems:'center'
	},
	backButton: {
		alignSelf: "center",
		paddingLeft: wp(4),
	},
	profileOptions: {
		// flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#fff",
		// flex: 4,
	},
	image: {
		height: hp(6),
		width: wp(12),
		borderRadius: wp(10),
	},
	icondot: {
		height: 12,
		width: 12,
	},
	icon: {
		height: 18,
		width: 18,
	},
	iconview:
{
  width:35,
  height:35,
  backgroundColor:'rgba(112, 112, 112, 0.09)',
borderRadius:20,
alignItems:'center',
justifyContent:'center',
},
	usernameAndOnlineStatus: {
		justifyContent: "center",
		alignItems:'center',
		paddingHorizontal: wp(2),
		marginTop:hp(3)
	},
	username: {
		color: 'white',
		fontSize: hp(2.5),
		fontWeight: "300",
	},
	onlineStatus: {
		color: 'rgba(21, 22, 36, 1)',
		fontSize: 16,
	},
	options: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default ChatHeader;
