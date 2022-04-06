import { StyleSheet, View, Text, Button, FlatList, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import {sessionStorage} from '../../storage/Storage'
import Polyline from '@mapbox/polyline';

export default function Training(props) {
    //MUISTA LISÄTÄ KARTTA TÄHÄNKIN VERSIOON! 
    //TODO: MAP KOMPONENTTI VANHASTA BRANCHISTA
    
    const [openBoolean, setOpenBoolean] = React.useState(false)
 
    const changeOpenBoolean = () => {
        openBoolean ? setOpenBoolean(false) : setOpenBoolean(true)
    }

    const navigateAndStorePolyline = () => {
        sessionStorage.setItem('polyline', props.item.map.summary_polyline)
        props.navigation.navigate('Map')
        
    }

    const date = new Date(props.item.start_date_local)

    const styles = StyleSheet.create({
        item: {
          borderRadius: 8,
          width:'100%',
          marginTop:10,
          fontSize: 28,
          padding:10,
          backgroundColor: '#A9A9A9'
        },
        button: { 
            width:'20%'
        },
        row: {
            flexDirection:'row',
            padding:4,
            borderStyle:'solid',
            borderColor:'#778899',
            borderWidth:1,
            marginTop:5,
            borderBottomColor:'#A9A9A9'
        },
        text:{
            marginTop:10,
            width:'75%'
        },
        info: {
            padding:10,
            backgroundColor:'#778899',
            borderRadius: 8,
        },
        data:{width:'50%'},
        logo:{
            width:'13%',
            padding: 10,
            marginRight:10,
            borderRadius:50
        }
    })

    return(
        <View style={styles.item}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>{props.item.name}</Text>
                <Image source={{uri: props.user.athlete_picture}}  style={styles.logo} ></Image>
                <FontAwesome.Button
                color='black'
                name="angle-down"
                backgroundColor= '#A9A9A9'
                onPress={changeOpenBoolean}/>
            </View>

            {
            openBoolean && 
            <View style={styles.info}>
                
                <View style={styles.row}>
                    <Text style={styles.data}>Time used moving: </Text>
                    <Text style={styles.data}>{Math.round(props.item.moving_time / 60)} minutes</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.data}>Meters moved: </Text>
                    <Text style={styles.data}>{props.item.distance}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.data}>Date: </Text>
                    <Text style={styles.data}>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.data}>Type of cardio: </Text>
                    <Text style={styles.data}>{props.item.type}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.data}>athlete username: </Text>
                    <Text style={styles.data}>{props.user.athlete_name}</Text>
                </View>
                <FontAwesome.Button
                color='black'
                name="map"
                backgroundColor= '#778899'
                onPress={navigateAndStorePolyline}
                />
            
            </View>
            }
        </View> 
    )}