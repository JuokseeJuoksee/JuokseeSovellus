import { View, Text, ImageBackground, TextInput, Button, Alert } from 'react-native';
import { db } from '../../database/firebase'
import Image from '../../assets/background.jpg'
import React, { useEffect, useState } from 'react';
import { push, ref } from 'firebase/database';
import { app } from '../../database/firebase'
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import userContext from '../../context/user/userContext';
import DatePicker from 'react-native-modern-datepicker'
import dayjs from 'dayjs';

const auth = getAuth(app)
const user = auth.currentUser;

export default function CreateRoom({ navigation }) {

    const [roomName, setRoomName] = useState('')
    const { state } = useContext(userContext)
    const [date, setDate] = useState(null)
   
    const saveRoom = () => {
        if (roomName) {
            push(
                ref(db, 'rooms'), {
                    roomname: roomName,
                    host: state.user.userId,
                    hostPictureUrl: state.user.athlete_picture,
                    messages: [{send: new Date().getTime(), message: "Ei vielä viestejä, ole ensimmäinen"}],
                    created: new Date().getTime(),
                    users: [state.user.userId],
                    endsIn: date
                }
            )
            setRoomName('')
            navigation.navigate('Kilpailut')
        } else {
            Alert.alert("Muikkari!", "Anna kilpailullesi nimi")
        }
    }

    React.useEffect(() => console.log(`date is ${date}`),[date])

    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground 
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                resizeMode="cover"
                source={Image}
            >         
                <View style={{
                    height: '90%',
                    width: '90%',
                    backgroundColor: 'white',
                    opacity: 0.7,
                    borderRadius: 20,
                    alignItems: 'center'               
                }}>
                    <Text style={{ fontSize: 17, margin: 20 }}>Luo uusi kilpailu!</Text> 
                    <TextInput 
                        placeholder='Huoneen nimi'
                        style={{
                            padding:10
                        }}
                        onChangeText={nimi => setRoomName(nimi)}
                        value={roomName}
                    />  

                    <DatePicker
                        onSelectedChange={data => setDate(data)}
                        />

                    <Button 
                        title='Luo kilpailu'
                        onPress={saveRoom}
                    />
                </View>
                
            </ImageBackground>   
        </View>
    )
}