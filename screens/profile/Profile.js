import { View, Button, Image, Text } from "react-native";
import LogoutButton from "../../components/buttons/LogoutButton";
import StravaButton from "../../components/buttons/StravaButton";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react"
import { onValue, ref, set } from "firebase/database";
import { db } from "../../database/firebase";
import { Avatar, ListItem } from "react-native-elements";
import userContext from "../../context/user/userContext"
import tyylit from "../../tyyli/tyyli";
import { getAuth } from 'firebase/auth';
import { app } from '../../database/firebase'
import DefAvatar from "../../assets/avatar.png"

export default function Profile({navigation}) {

    
    const { state } = useContext(userContext)
    
    const auth = getAuth(app)
    const user = auth.currentUser;
   

    const renderAvatar = () => {

        let picture

        const userRef = ref(db, 'users/' + user.uid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            picture = data.athlete_picture
            
        })

        return <Avatar rounded source={picture? {uri: picture} : DefAvatar}/>
    }

    // useEffect( () => {
    //     console.log('moi')
    //     console.log(usersInfo)
    // },[usersInfo])
        
    return (
        <View style={{
            flex: 1
        }}>
            <View>
            <Image source={require('../../assets/stravaprofile.png')}/>               
            </View>
            {renderAvatar()}
            <View style={tyylit.profile}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>Tervetuloa skabaan</Text>
            </View>
            <View>
            <LogoutButton />
            <StravaButton />
            </View>
        </View>
    )
}